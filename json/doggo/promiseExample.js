// async function getName() {
//   return "Brian";
// }

console.log("a promise", getName());

getName().then(function (name) {
  console.log("the actual function name", name);
});

async function getName(name) {
  return name;
}
async function getMultipleNames() {
  const names = Promise.all([
    getName("Brian"),
    getName("Joe"),
    getName("Alison"),
  ]);

  console.log(names);
}

getMultipleNames();
