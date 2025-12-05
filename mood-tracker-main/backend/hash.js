import bcrypt from "bcryptjs"; // or 'bcrypt' if you prefer native

const password = "password12345";

const hashPassword = async () => {
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hash);
  } catch (err) {
    console.error("Error hashing password:", err);
  }
};

hashPassword();
