const { createClient } = require("redis");

class Redis {
  constructor(password, host, port) {
    this.client = createClient({
      password,
      socket: {
        host,
        port,
      },
    });

    this.client.on("error", (err) => {
      console.log("Redis Client Error", err);
    });
    this.initialize();
  }

  async initialize() {
    try {
      await this.client.connect();
      console.log("Redis client connected");
    } catch (error) {
      console.error("Failed to connect to Redis", error);
    }
  }

  async set(key, value) {
    try {
      await this.client.set(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to set value in Redis", error);
    }
  }

  async get(key) {
    try {
      return JSON.parse(await this.client.get(key));
    } catch (error) {
      console.error("Failed to get value from Redis", error);
    }
  }

  async delete(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error("Failed to set value in Redis", error);
    }
  }

  async close() {
    try {
      await this.client.quit();
      console.log("Redis client disconnected");
    } catch (error) {
      console.error("Failed to disconnect Redis client", error);
    }
  }
}

module.exports = Redis;
