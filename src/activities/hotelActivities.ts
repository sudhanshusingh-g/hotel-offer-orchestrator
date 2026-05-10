import { getMergedHotels } from "../services/hotelService";

export async function fetchMergedHotels(city: string) {
  return await getMergedHotels(city);
}
