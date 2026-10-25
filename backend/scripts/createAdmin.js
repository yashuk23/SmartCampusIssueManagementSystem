import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME?.trim() || !ADMIN_EMAIL?.trim() || !ADMIN_PASSWORD) {
    throw new Error("Set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD before running this command");
  }

  if (ADMIN_PASSWORD.length < 6) {
    throw new Error("ADMIN_PASSWORD must be at least 6 characters long");
  }

  await connectDB();
  await User.createIndexes();

  const email = ADMIN_EMAIL.trim().toLowerCase();
  const admins = await User.find({ role: "admin" }).select("email");

  if (admins.length > 1) {
    throw new Error("Multiple admin accounts already exist. Resolve them in MongoDB before provisioning.");
  }

  if (admins.length === 1 && admins[0].email !== email) {
    throw new Error("An admin account already exists. Only that account can be maintained with this command.");
  }

  const user = await User.findOne({ email });

  if (user) {
    user.name = ADMIN_NAME.trim();
    user.password = ADMIN_PASSWORD;
    user.role = "admin";
    user.adminKey = "primary-admin";
    await user.save();
    console.log("Existing account promoted to admin and password updated.");
    return;
  }

  await User.create({
    name: ADMIN_NAME.trim(),
    email,
    password: ADMIN_PASSWORD,
    role: "admin",
    adminKey: "primary-admin"
  });

  console.log("Admin account created.");
};

try {
  await createAdmin();
} catch (error) {
  console.error("Admin provisioning failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
