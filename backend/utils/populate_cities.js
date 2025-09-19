import { readFileSync } from "fs";
import db from "./db.js";

const data = readFileSync("./cities.txt", "utf-8");

const lines = data.split("\n");

for (let line of lines) {
  if (!line.trim()) continue;

  // Parse fields from line
  const nameMatch = line.match(/City Name = "([^"]+)"/);
  const locationMatch = line.match(/Location = "([^"]+)"/);
  const countryMatch = line.match(/Country = "([^"]+)"/);

  if (nameMatch && locationMatch && countryMatch) {
    const name = nameMatch[1];
    const location = locationMatch[1];
    const country = countryMatch[1];

    // if city doesn't exist, insert it
    const existingCity = await db.city.findUnique({ where: { name } });
    if (!existingCity) {
      await db.city.create({
        data: {
          name,
          location,
          country,
        },
      });
      console.log(
        `Inserted city: ${name}, Location: ${location}, Country: ${country}`
      );
    } else {
      console.warn(`City ${name} already exists.`);
    }
  }
}
console.log("Cities inserted successfully.");
