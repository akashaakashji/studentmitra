import express from "express";
import cors from "cors";
import driveRoutes from "./routes/driveRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/drive", driveRoutes);

export default app;

