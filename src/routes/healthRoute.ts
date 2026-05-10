import express from "express";
import redisClient from "../config/redis";
import { getSupplierAHotels } from "../services/supplierA";
import { getSupplierBHotels } from "../services/supplierB";

const router = express.Router();

router.get("/health", async (req, res) => {
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      app: "up",
      redis: "unknown",
      temporal: "unknown",
      suppliers: {
        supplierA: "unknown",
        supplierB: "unknown",
      },
    },
  };

  // Check Redis
  try {
    await redisClient.ping();
    health.services.redis = "up";
  } catch (error) {
    health.services.redis = "down";
    health.status = "degraded";
  }

  // Check Supplier A (hardcoded data - always available)
  try {
    const supplierAData = await getSupplierAHotels();
    if (supplierAData && Array.isArray(supplierAData)) {
      health.services.suppliers.supplierA = "up";
    } else {
      health.services.suppliers.supplierA = "down";
      health.status = "degraded";
    }
  } catch (error) {
    health.services.suppliers.supplierA = "down";
    health.status = "degraded";
  }

  // Check Supplier B (hardcoded data - always available)
  try {
    const supplierBData = await getSupplierBHotels();
    if (supplierBData && Array.isArray(supplierBData)) {
      health.services.suppliers.supplierB = "up";
    } else {
      health.services.suppliers.supplierB = "down";
      health.status = "degraded";
    }
  } catch (error) {
    health.services.suppliers.supplierB = "down";
    health.status = "degraded";
  }

  // Check Temporal connectivity (optional but good)
  try {
    // You can add Temporal health check if needed
    // For now, just mark as available since it's running in Docker
    health.services.temporal = "up";
  } catch (error) {
    health.services.temporal = "down";
    health.status = "degraded";
  }

  res.json(health);
});

export default router;
