import express from "express";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import config from "./config.js";

import data from "./data.js";

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

app.get("/", (req, res) => {
  res.send("Sever is ready.");
});

//** Connect to MongoDB */

const MONGODB_URI = config.MONGODB_URI;

mongoose
  .connect(
    MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    console.log("Connected to MongoDB")
  )

  .catch((error) => console.log(error.reason));

//** Validating connecting to server */
app.listen(port, () => {
  console.log(`Server at ${port}`);
});

export default app;
