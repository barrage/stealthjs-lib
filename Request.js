import ky from "ky-universal";

/**
 * Simple class that lets us make requests
 * @class
 */
export default class Request {
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

    if (this.stealth.host.startsWith("http")) {
      this.url = `${this.stealth.host}:${this.stealth.port}`;
    }
    else {
      this.url = `http://${this.stealth.host}:${this.stealth.port}`;
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

    const response = await ky(this.url, options).json();

    if (this.stealth.debug) {
      console.log(response);
    }

    if (response && !response.error) {
      return response;
    }

    throw new Error(`Stealth Error: ${(response || {}).error || "Did not get any response"}`);
  }
}
