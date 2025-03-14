const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
console.log(daysOfTheWeek);

// iterating through arrays
// method 1
for (let i = 0; i < daysOfTheWeek.length; i++) {
  console.log(daysOfTheWeek[i]);
}

for (let i = 0; i < daysOfTheWeek.length; i++) {
  console.log(daysOfTheWeek[i], i);
}

// method 2// this is a call back function
function logDay(day) {
  console.log(day);
}

console.log("-----------------");
daysOfTheWeek.forEach(logDay);
// call back function directly into for each
daysOfTheWeek.forEach(function (day) {
  console.log(day);
});

console.log("-----------------");
console.log(daysOfTheWeek[0]);
console.log(daysOfTheWeek[1]);

const primeNumbers = [1, 2, 3, 5, 7, 11, 13, 17];
console.log(primeNumbers.length);
console.log(primeNumbers.join("*"));

const courses = [
  { teacher: "Rick Santiago", course: "Biology" },
  { teacher: "Gen Cramer", course: "Math" },
  { teacher: "Vitaly Sardone", course: "Aquatics" },
];

console.log(courses.length);
console.log(courses);
courses.push({ teacher: "Vladimir Seal", course: "Automotive" });
console.log(courses);
console.log(courses.length);
courses[0] = { teacher: "Ricardo Santiago", course: "Biology" };
console.log(courses[0]);

const last = courses.pop();
console.log(last);

console.log(courses);
