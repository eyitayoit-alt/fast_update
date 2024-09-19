const { expect } = require("chai");
describe("Test Fast Update", function () {
  let contract;
  beforeEach(async function () {
    contract = await ethers.deployContract("FastUpdate");
  });

  it("Fetch Feeds", async function () {
    const indices = [0, 2, 9];
    const res = await contract.fetchFeed(indices);
    expect(res[0]).to.be.an("array");
    expect(res[1]).to.be.an("array");
    expect(res[2]).to.be.gt(1695817332);
  });
});
