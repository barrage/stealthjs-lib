const fetch = require("node-fetch");

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
      body: JSON.stringify(this.bodyOrQuery),
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

    const response = await (await fetch(this.url, options)).json();
    return response;
  }
};
