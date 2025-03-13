import type { LambdaInterface } from "@aws-lambda-powertools/commons/types";
import { getSecret } from "@aws-lambda-powertools/parameters/secrets";
import { Tracer } from "@aws-lambda-powertools/tracer";
import { Subsegment } from "aws-xray-sdk-core";
import axios from "axios";

const tracer = new Tracer({ serviceName: "id-lookup" });

interface IEmailLookupFields {
  birthdate_char: string;
  last_name: string;
  ssn: string;
  umhr_emplid: string;
  emplid?: string;
}

/**
 * Implements manual function tracing as a higher order function (MFTaaHOF) as seen in powertools docs.
 * See: https://docs.powertools.aws.dev/lambda/typescript/latest/core/tracer/#manual_1
 */
const captureTrace = <T>(segmentName: string, fn: () => Promise<T>) => {
  const parentSubsegment = tracer.getSegment();
  let subsegment: Subsegment | undefined;
  if (parentSubsegment) {
    subsegment = parentSubsegment.addNewSubsegment(segmentName);
    tracer.setSegment(subsegment);
  }

  try {
    return fn();
  } catch (e) {
    tracer.addErrorAsMetadata(e as Error);
    console.error(e);
    throw e;
  } finally {
    if (parentSubsegment && subsegment) {
      subsegment.close();
      tracer.setSegment(parentSubsegment);
    }
  }
};

class InputValidator {
  static checkLastName(lastName: string) {
    // *** IMPORTANT NOTE *** --> If this REGEX fails to work, please comment it out and uncomment the one below.
    // let regex = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð '-]{1,64}$/u);

    let regex = new RegExp(
      /^[a-zA-Z\u00E0\u00E1\u00E2\u00E4\u00E3\u00E5\u0105\u010D\u0107\u0119\u00E8\u00E9\u00EA\u00EB\u0117\u012F\u00EC\u00ED\u00EE\u00EF\u0142\u0144\u00F2\u00F3\u00F4\u00F6\u00F5\u00F8\u00F9\u00FA\u00FB\u00FC\u0173\u016B\u00FF\u00FD\u017C\u017A\u00F1\u00E7\u0161\u017E\u00C0\u00C1\u00C2\u00C4\u00C3\u00C5\u0104\u0106\u010C\u0116\u0118\u00C8\u00C9\u00CA\u00CB\u00CC\u00CD\u00CE\u00CF\u012E\u0141\u0143\u00D2\u00D3\u00D4\u00D6\u00D5\u00D8\u00D9\u00DA\u00DB\u00DC\u0172\u016A\u0178\u00DD\u017B\u0179\u00D1\u00DF\u00C7\u0152\u00C6\u0160\u017D\u2202\u00F0 '-]{1,64}$/
    );
    return regex.test(lastName);
  }
}

class Controller {
  static async getPSLoginSecret(): Promise<{
    username: string;
    password: string;
  }> {
    try {
      const secret = (await getSecret(process.env.AUTH_SECRET_NAME!)) as
        | string
        | undefined;

      if (!secret) {
        throw new Error("secret is undefined");
      }

      const { SA_USERNAME: username, SA_PASSWORD: password } =
        JSON.parse(secret);
      return { username, password };
    } catch (e) {
      console.error("error fetching secret");
      console.error(e);
      throw e;
    }
  }

  static async getAuthHeader() {
    const { username, password } = await this.getPSLoginSecret();
    const base64userPass = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    return `Basic ${base64userPass}`;
  }
}

/**
 * Call Secrets Manager during function initialization instead of handler execution.
 *
 * See: https://stackoverflow.com/a/74005611
 */

const getAuthHeader = SecretsController.getAuthHeader.bind(SecretsController);
const authHeader = captureTrace("Call Secrets Manager", getAuthHeader);

class Lambda implements LambdaInterface {
  @tracer.captureLambdaHandler()
  public async handler(_event: unknown, _context: unknown) {
    const event = _event as IEmailLookupFields;

    const responseData: {
      statusCode: number;
      body: string;
    } = {
      statusCode: 500,
      body: JSON.stringify(null),
    };

    try {
      let frags = event.birthdate_char.split("/");
      let bday = frags[0] + frags[1] + frags[2];

      const dateOfBirth = new Date(
        Number(frags[2]),
        Number(frags[0]) - 1,
        Number(frags[1])
      );

      const dateToday = new Date();
      if (dateOfBirth > dateToday) {
        throw new Error("Birth Date Entered is not in the past.");
      }

      if (!InputValidator.checkLastName(event.last_name)) {
        throw new Error("Last Name contains invalid characters.");
      }

      if (event.ssn == "" && event.umhr_emplid == "") {
        throw new Error("SSN and Emp ID empty");
      } else if (event.ssn.length != 4 && event.umhr_emplid == "") {
        throw new Error("SSN is not 4 characters long");
      } else if (event.ssn == "" && event.umhr_emplid.length != 8) {
        throw new Error("Employee ID is not 8 characters long");
      }

      const response = await axios.post(
        process.env.PS_PATH!,
        {
          last_name: event.last_name,
          birthdate_char: bday,
          ssn: event.ssn,
          umhr_emplid: event.umhr_emplid,
          student_id: event?.emplid,
        },

        {
          baseURL: process.env.PS_URL!,
          headers: {
            Accept: "*/*",
            Authorization: await authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;

      responseData.statusCode = 200;
      responseData.body = JSON.stringify(data);
    } catch (e) {
      tracer.addErrorAsMetadata(e as Error);
    } finally {
      return responseData;
    }
  }
}

const handlerClass = new Lambda();
export const handler = handlerClass.handler.bind(handlerClass);
