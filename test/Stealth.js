const Stealth = require("../Stealth");

const getStealth = () => {
  // You have to start up the daemon locally for any additional tests to work.
  return new Stealth({
    host: "localhost",
    port: 8080,
    debug: true,
  });
};

describe("Stealth", function () {
  it("Should instantiate Stealth class without failing", async function () {
    getStealth();
  });
  // All additional tests cannot be performed since public testnet RPC is still not available
  // it("Should display help", async function () {
  //   await getStealth().help();
  // });
});
