const { createClient } = require("redis");

class RedisService {
  constructor() {
    this.client = createClient();
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    this.client.connect();
  }

  set(key, value, time) {
    if (key && value && time) this.client.set(key, value, "EX", time);
    else throw new Error("provide key, value and time");
  }

  get(key) {
    return this.client.get(key);
  }

  exists(key) {
    return this.client.exists(key);
  }

  delete(key) {
    this.client.del(key);
  }
}

module.exports = new RedisService();
