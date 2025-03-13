const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const doggos = document.getElementById("dog-target");

function addNewDoggo() {
  const promise = fetch(DOG_URL);
  promise
    .then(function (response) {
      //const processingPromise = response.text();
      const processingPromise = response.json();
      return processingPromise;
    })

    .then(function (processedResponse) {
      // skip this line since it will already be an object
      // const dogObject = JSON.parse(processedResponse);

      const image = document.createElement("img");
      //image.src = dogObject.message;
      // image.src = processedResponse.message();
      image.src = processedResponse.message;
      image.alt = "Cute doggo";
      doggos.appendChild(image);
    });
}

document.getElementById("dog-btn").addEventListener("click", addNewDoggo);
