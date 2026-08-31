// // Import the account model, to do our database operations, obviously..
import Person from "../models/Person.js";
// For authentication purposes..
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js"
// This exists to sanitize requests.
import sanitize from "mongo-sanitize";


// Sign in and create a token
export async function createToken(data) {
	var sanitizedData = sanitize(data);
	const person = await Person.findOne({ email: sanitizedData.email });
	if (!person) {
		throw new Error("This email doesn't exist");
	}
	const isMatching = await bcrypt.compare(sanitizedData.password, person.password);
	if (!isMatching) {
		throw new Error("Password is wrong");
	}
	const personId = person._id.toString();
	const personRole = person.role;
	const accountToken = jwt.sign({ id: personId, role: personRole }, JWT_SECRET, { expiresIn: "1h" });
	return { token: accountToken };
}

// Simply find the person by email
export async function findPersonByEmail(email) {
	return await Person.findOne({ email: sanitize(email) });
}

// Create default admin user if it doesn't exist
export async function ensureAdminSeed() {
  const adminEmail = "quartzts@metrosync.com";

  // Check if admin already exists
  const existing = await Person.findOne({ email: adminEmail });
  if (existing) return; // Admin exists, do nothing

  // Hash (encrypt) the password for security
  const hash = await bcrypt.hash("Souperstars!123", 10);

  // Create new admin user in database
  await Person.create({
	name: "QuartzTS",
    email: adminEmail,
    password: hash,
    role: "admin",
  });

  console.log("Seeded default admin: quartzts@metrosync.com / Souperstars!123");
}
