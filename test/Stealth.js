const chai = require("chai");
const Stealth = require("../Stealth");
const getStealth = () => {
  return new Stealth("https://api-mainnet-latest.stealthmonitor.xyz/");
};

describe("Stealth", function () {
  it("Should get 1 NFT Character", async function () {
    const client = getStealth();
    const { result: { data } } = await client.getcharacterspg(1, 1, true);
    chai.expect(data.length).to.be.equal(1);
  }).timeout(60000);

  it("Should get 9 NFT Character", async function () {
    const client = getStealth();
    const { result: { data } } = await client.getcharacterspg(1, 9, true);
    chai.expect(data.length).to.be.equal(9);
  }).timeout(60000);

  it("Should get 2nd page on 9 NFT Characters per page", async function () {
    const client = getStealth();
    const { result: { data } } = await client.getcharacterspg(2, 9, true);
    chai.expect(data[0].character_id).to.be.equal(10);
    chai.expect(data[data.length - 1].character_id).to.be.equal(18);
  }).timeout(60000);

  it.skip("Should instantiate Stealth class without failing and get help", async function () {
    const client = getStealth();
    await client.help();
  }).timeout(60000);
});
