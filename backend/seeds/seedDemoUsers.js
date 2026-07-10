import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";

dotenv.config();

const demoUsers = [
  {
    name: "Campus Admin",
    email: "admin@campus.com",
    password: "Admin123!",
    role: "admin"
  },
  {
    name: "Campus Staff",
    email: "staff@campus.com",
    password: "Staff123!",
    role: "staff"
  },
  {
    name: "Campus Student",
    email: "student@campus.com",
    password: "Student123!",
    role: "student"
  }
];

const seedDemoUsers = async () => {
  await connectDB();

  for (const user of demoUsers) {
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      existingUser.name = user.name;
      existingUser.role = user.role;
      existingUser.password = user.password;
      await existingUser.save();
      console.log(`Updated ${user.role}: ${user.email}`);
      continue;
    }

    await User.create(user);
    console.log(`Created ${user.role}: ${user.email}`);
  }

  process.exit(0);
};

seedDemoUsers().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
