const generateRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const startDate = new Date(2023, 8, 24); // August is 7 in JavaScript's Date object
const endDate = new Date(2023, 8, 30); // October is 9 in JavaScript's Date object

// Array of possible security guard roles
const possibleTitles = [
  "Relief Officer",
  "Security Head",
  "Door Supervisor",
  "Door Man",
  "CCTV Controller",
  "Operator Manager",
];

const eventArray = [];

// Generate a single random date
const randomStartDate = generateRandomDate(startDate, endDate);

for (let i = 1; i <= 8; i++) {
  // Use the same random start date for some events, others will have different random dates
  const start =
    i % 2 === 0 ? randomStartDate : generateRandomDate(startDate, endDate);
  const hoursToAdd = 5 + Math.random() * (12 - 5); // Generate a random number between 5 and 24
  const end = new Date(start.getTime() + hoursToAdd * 60 * 60 * 1000); // Adding up to 1 hour of variation

  // Randomly select a security guard role from the possibleTitles array
  const randomTitleIndex = Math.floor(Math.random() * possibleTitles.length);
  const title = possibleTitles[randomTitleIndex];

  eventArray.push({
    id: i,
    title: `${title} ${i}`,
    start: start.toISOString(),
    end: end.toISOString(),
    backgroundColor: getRandomColor(),
    allDay: true,
    description: `Event description goes here for ${title} ${i}`,
    location: `Location ${i}`,
    personRequired: `${Math.floor(Math.random() * 10)}/${Math.floor(
      Math.random() * 20
    )}`,
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default eventArray;
