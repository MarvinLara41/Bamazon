import dotenv from "dotenv";
dotenv.config();

const config = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:5000/Bamazon",
};

export default config;
