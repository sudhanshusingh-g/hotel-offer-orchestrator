import express from "express";
import cors from "cors";
import supplierRoutes from "./routes/supplierRoute";
import apiRoutes from "./routes/apiRoute";
import redisClient from "./config/redis";
import healthRoute from "./routes/healthRoute";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", supplierRoutes);
app.use("/", apiRoutes);
app.use("/", healthRoute);

app.get("/", (req, res) => {
  res.send("Hotel Offer Orchestrator API Running");
});

async function startServer() {
  try {
    // Connect to Redis
    await redisClient.connect();
    console.log("✅ Redis connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
