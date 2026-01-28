import express from "express";
import driveRoutes from "./routes/driveRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/drive", driveRoutes);

export default app;
