import { proxyActivities } from "@temporalio/workflow";

const { fetchMergedHotels } = proxyActivities<{
  fetchMergedHotels(city: string): Promise<any>;
}>({
  startToCloseTimeout: "1 minute",
});

export async function hotelWorkflow(city: string) {
  const hotels = await fetchMergedHotels(city);

  return hotels;
}
