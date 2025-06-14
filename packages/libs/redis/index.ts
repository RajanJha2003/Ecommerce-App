import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT) || 6379,
  password:process.env.REDIS_PASSWORD,
  tls: {},  // Upstash requires TLS
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 100, 3000);
    console.log(`🔄 Retry attempt ${times}, delaying ${delay}ms`);
    return delay;
  }
});

redis.on("connect", () => console.log("✅ Connected"));
redis.on("ready", () => console.log("🚀 Ready"));
redis.on("error", (err) => console.error("❌ Error:", err));
redis.on("close", () => console.warn("⚠ Connection closed"));

export default redis;
