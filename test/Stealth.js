import Stealth from "../Stealth.js";

const getStealth = () => {
  return new Stealth({
    host: "195.29.45.123",
    port: 46503,
    username: "010101010101010101",
    password: "1122334411223344",
    debug: true,
  });
};

describe("Stealth", function () {
  it("Should instantiate Stealth class without failing", async function () {
    getStealth();
  });
});
