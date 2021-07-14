import express from "express";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import config from './config.js'

import path from "path";


import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/upLoadRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT;
const __dirname = path.resolve();

/**API */
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID );
});

/**Allows server to accept and display uploaded images */
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


//** Error handler */
app.use((err, req, res, next) => {
  res.status(500, res.send({ message: err.message }));
});


/** Heroku */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
)
} else {
  app.use(express.static("frontend/public"));
}



//** Connect to MongoDB */
const mongodbURI = config.MONGODB_URI

mongoose
  .connect(mongodbURI, {
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
