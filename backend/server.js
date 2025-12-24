import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reportRoutes from "./routes/reportRoutes.js";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", reportRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);