import express from "express";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

//** Error handler */
app.use((err, req, res, next) => {
  res.status(500, res.send({ message: err.message }));
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
