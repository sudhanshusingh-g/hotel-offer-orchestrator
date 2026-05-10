import express from "express";

import { getSupplierAHotels } from "../services/supplierA";
import { getSupplierBHotels } from "../services/supplierB";

const router = express.Router();

router.get("/supplierA/hotels", async (req, res) => {
  const hotels = await getSupplierAHotels();

  res.json(hotels);
});

router.get("/supplierB/hotels", async (req, res) => {
  const hotels = await getSupplierBHotels();

  res.json(hotels);
});

export default router;
