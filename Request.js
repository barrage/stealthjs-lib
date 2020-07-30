const ky = require("ky-universal");

/**
 * Simple class that lets us make requests
 * @class
 */
module.exports = class Request {
  /**
   * @param {Stealth} stealth
   * @param {string} method
   * @param {any[]} params
   * @param {number} id
   */
  constructor(stealth, method = "", params = [], id) {
    /**
     * Stealth instance with all global defaults
     *
     * @type {Stealth}
     */
    this.stealth = stealth;

    /**
     * Request URL
     *
     * @type {string}
     */
    this.url = "";

    /**
     * Data to be sent in the request as a body or query (for GET)
     *
     * @type {{}}
     */
    this.bodyOrQuery = {};

    this.url = `${this.stealth.protocol}//${this.stealth.host}`;

    if (this.stealth.port) {
      this.url += `:${this.stealth.port}`;
    }

    if (this.stealth.pathname) {
      this.url += `${this.stealth.pathname}`;
    }

    this.bodyOrQuery = JSON.parse(JSON.stringify({
      id,
      jsonrpc: this.stealth.jsonRpc,
      method: method.toLowerCase(),
      params: params.filter((item) => typeof item !== "undefined"),
    }));
  }

  /**
   * Make the request
   *
   * @return {Promise<{object}>}
   */
  async make() {
    const options = {
      method: "POST",
      json: this.bodyOrQuery,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (this.stealth.username && this.stealth.password) {
      options.headers.Authorization = `Basic ${Buffer.from(`${this.stealth.username}:${this.stealth.password}`).toString("base64")}`;
    }

    if (this.stealth.debug) {
      console.log(this.url, options);
    }

    let response;

    if (typeof ky !== "function") {
      response = await ky.default(this.url, options);
    }
    else {
      response = await ky(this.url, options);
    }

    if (response && response.ok && !response.error) {
      const data = await response.text();
      let parsed;

      if (data.startsWith("{") || data.startsWith("[")) {
        try {
          parsed = JSON.parse(data);
        }
        catch (error) {
          parsed = data;
        }
      }
      else {
        parsed = data;
      }

      if (this.stealth.debug) {
        console.log(parsed);
      }

      return parsed;
    }

    throw new Error(`Stealth Error: ${(response || {}).error || "Did not get any response"}`);
  }
};
