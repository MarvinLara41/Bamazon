import express from "express";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import config from "./config.js";

import data from "./data.js";
import userRouter from "./routers/userRouter.js";

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

app.use("/api/users", userRouter);

//** Error handler */
app.use((err, req, res, next) => {
  res.status(500, send({ message: err.message }));
});

app.get("/", (req, res) => {
  res.send("Sever is ready.");
});

//** Connect to MongoDB */

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/Bamazon", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error.reason));

//** Validating connecting to server */
app.listen(port, () => {
  console.log(`Server at ${port}`);
});

export default app;
