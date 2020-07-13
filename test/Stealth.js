const Stealth = require("../Stealth");

const getStealth = () => {
  // You have to start up the daemon locally for any additional tests to work.
  return new Stealth({
    host: "localhost",
    port: 46503,
    debug: true,
  });
};

describe("Stealth", function () {
  it("Should instantiate Stealth class without failing", async function () {
    getStealth();
  });
});
