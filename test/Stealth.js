const Stealth = require("../Stealth");

const getStealth = () => {
  return new Stealth("https://api.stealthmonitor.xyz");
};

describe("Stealth", function () {
  it("Should instantiate Stealth class without failing and get help", async function () {
    const client = getStealth();
    await client.help();
  }).timeout(60000);
});
