import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("test", function () {
  async function deployFixture() {
    const [owner, a1, a2] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("Score");
    const score = await factory.deploy();


    return { score, owner, a1, a2};
  }

  describe("save_withdraw", function () {
    it("save", async function () {
      const { score, owner, a1, a2} = await loadFixture(deployFixture);

      console.log("owner " + owner.address)
      console.log("a1 " + a1.address)
      console.log("score " + score.address)
      const teacher = await ethers.getContractAt("Teacher", await score.teacher(), a1)
      console.log("score.teacher " + await score.teacher())
      console.log("score.last_sender" + await score.last_sender())
      await teacher.update(score.address, a1.address, 100)
      console.log("score.last_sender" + await score.last_sender())

    });

  });
});
