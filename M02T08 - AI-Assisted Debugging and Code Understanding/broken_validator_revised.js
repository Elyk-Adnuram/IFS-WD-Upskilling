// broken_validator.js
function processUserSubmissions(submissions) {
  let verifiedAdults = [];

  // Defensive check to ensure input is an array
  if (!Array.isArray(submissions)) {
    return verifiedAdults;
  }
  submissions.forEach((user) => {
    // optional chaining is used to check if the status?.isApproved property exists
    // if it does not exist the condition will evaluate to falsy and that user object will be skipped without crashing the program
    if (user?.status?.isApproved && typeof user?.age === "number" && user.age >= 18) {
      verifiedAdults.push(user.name);
    }
  });

  return verifiedAdults;
}

// Test execution footprint that triggers the runtime crash
const rawData = [
  { name: "Alice", age: 25, status: { isApproved: true } },
  { name: "Bob", age: 17, status: { isApproved: false } },
  { name: "Charlie", age: 30 }, // Missing status object property completely
];

console.log(processUserSubmissions(rawData));
