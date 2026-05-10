import { getSupplierAHotels } from "./supplierA";
import { getSupplierBHotels } from "./supplierB";
import redisClient from "../config/redis";

export const getMergedHotels = async (city: string) => {
  const redisKey = `hotels:${city}`;

  try {
    // Ensure Redis is connected
    if (!redisClient.isOpen) {
      console.log("Redis not open, attempting to connect...");
      await redisClient.connect();
    }

    // Try to get from cache
    const cachedHotels = await redisClient.get(redisKey);
    if (cachedHotels) {
      console.log("✅ Returning data from Redis cache");
      return JSON.parse(cachedHotels);
    }
  } catch (error: any) {
    console.error("Redis error (continuing without cache):", error.message);
    // Continue without cache
  }

  console.log("Fetching fresh data from suppliers...");

  // Fetch from both suppliers in parallel
  const [supplierAHotels, supplierBHotels] = await Promise.all([
    getSupplierAHotels(),
    getSupplierBHotels(),
  ]);

  const allHotels = [...supplierAHotels, ...supplierBHotels];
  const hotelMap = new Map();

  for (const hotel of allHotels) {
    if (hotel.city !== city) {
      continue;
    }

    const existingHotel = hotelMap.get(hotel.name);
    if (!existingHotel || hotel.price < existingHotel.price) {
      hotelMap.set(hotel.name, hotel);
    }
  }

  const finalHotels = Array.from(hotelMap.values());

  // Try to cache the results (but don't fail if Redis is down)
  try {
    if (redisClient.isOpen) {
      await redisClient.set(redisKey, JSON.stringify(finalHotels), {
        EX: 300, // Expire after 5 minutes
      });
      console.log("✅ Cached hotels in Redis");
    }
  } catch (error: any) {
    console.error("Failed to cache in Redis:", error.message);
  }

  return finalHotels;
};
