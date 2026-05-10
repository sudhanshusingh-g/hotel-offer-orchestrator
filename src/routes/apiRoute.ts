import express from "express";

import { Connection, Client } from "@temporalio/client";

import { hotelWorkflow } from "../workflows/hotelWorkflow";

const router = express.Router();

router.get("/api/hotels", async (req, res) => {
  try {
    const city = req.query.city as string;
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    // connect temporal
    const connection = await Connection.connect({
      address: "temporal:7233",
    });

    const client = new Client({
      connection,
    });

    // start workflow
    const handle = await client.workflow.start(hotelWorkflow, {
      args: [city],

      taskQueue: "hotel-task-queue",

      workflowId: `hotel-workflow-${Date.now()}`,
    });

    // wait for result
    const result = await handle.result();

    let filteredHotels = result;

    if (minPrice && maxPrice) {
      filteredHotels = result.filter((hotel: any) => {
        return hotel.price >= minPrice && hotel.price <= maxPrice;
      });
    }

    res.json(filteredHotels);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

export default router;
