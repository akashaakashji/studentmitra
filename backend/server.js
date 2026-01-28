//import dotenv from "dotenv";
import express from "express";
//import cors from "cors";
//import mongoose from "mongoose";
import driveRoutes from "./routes/driveRoutes.js";


//dotenv.config();
const app = express();

//app.use(cors());
app.use(express.json());

//mongoose.connect(process.env.MONGO_URI)
//.then(() => console.log("MongoDB Connected"));

app.use("/api/drive", driveRoutes);
//app.use("/api", driveRoutes);


export default app;

//local only ka liya
//if (!process.env.VERCEL) {
//app.listen(5000, () => {
 // console.log("Server running on port 5000");
//});}

