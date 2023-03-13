import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
  async function deployCounterFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const counter_factory = await ethers.getContractFactory("Counter");
    const counter = await counter_factory.deploy();

    return { counter, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("owner call count succ", async function () {
      const { counter, owner, otherAccount} = await loadFixture(deployCounterFixture);

      await expect(counter.count()).not.to.be.reverted;
      expect(await counter.counter()).to.equal(1);
    });

    it("otherAccount call count failed", async function () {
      const { counter, owner, otherAccount} = await loadFixture(deployCounterFixture);

      await expect(counter.connect(otherAccount).count()).to.be.reverted;
      expect(await counter.counter()).to.equal(0);
    });
  });
});
