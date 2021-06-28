import express from "express";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import path from "path";

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/upLoadRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5002;
const __dirname = path.resolve();

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

/**Allows server to accept and display uploaded images */
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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
