import express from "express";
import productsRouter from "./routes/products.js";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";

// make database connection
await mongoose.connect(process.env.MONGO_URI);

//Create an express app
const app = express();

// Use global middlewares
app.use(express.json());

//Use routes
app.use(productsRouter);
app.use(userRouter);

//Listen for incoming request
const port = process.env.PORT || 4900;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
