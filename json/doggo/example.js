const responseFromServer = `{
  "name": "Luna",
  "age": 10,
  "breed": "Terrier",
  "location": {
    "city": "Seattle",
    "state": "Washington"
  }
}`;

const responseObject = JSON.parse(responseFromServer);
console.log(responseObject);
console.log(responseObject.location.city);
console.log(responseObject);

const dog = `{
  "name": "Luna",
  "age": 10,
  "breed": "Terrier",
  "location": {
    "city": "Seattle",
    "state": "Washington"
  }
}`;

jsonString = JSON.stringify(dog);
console.log(jsonString);
