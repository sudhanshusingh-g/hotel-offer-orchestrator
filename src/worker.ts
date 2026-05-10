import { Worker, NativeConnection } from "@temporalio/worker";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runWorker() {
  console.log("🚀 Starting Temporal Worker...");

  // Retry connection up to 30 times (60 seconds)
  let retries = 30;
  let connected = false;

  while (retries > 0 && !connected) {
    try {
      console.log(
        `Attempting to connect to Temporal (${retries} retries left)...`,
      );

      const connection = await NativeConnection.connect({
        address: process.env.TEMPORAL_ADDRESS || "temporal:7233",
      });

      connected = true;
      console.log("✅ Connected to Temporal");

      const worker = await Worker.create({
        connection,
        workflowsPath: require.resolve("./workflows/hotelWorkflow"),
        activities: require("./activities/hotelActivities"),
        taskQueue: "hotel-task-queue",
      });

      console.log("✅ Worker started successfully, polling for tasks...");
      await worker.run();
    } catch (err: any) {
      console.log(`Failed to connect: ${err.message}`);
      retries--;
      if (retries > 0) {
        console.log(`Waiting 2 seconds before retry...`);
        await sleep(2000);
      } else {
        console.error("❌ Worker failed to connect after all retries");
        process.exit(1);
      }
    }
  }
}

runWorker().catch((err) => {
  console.error("❌ Worker failed:", err);
  process.exit(1);
});
