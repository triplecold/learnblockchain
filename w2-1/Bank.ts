import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Bank", function () {
  async function deployBankFixture() {
    const [owner, a1, a2] = await ethers.getSigners();

    const bank_factory = await ethers.getContractFactory("Bank");
    const bank = await bank_factory.deploy();


    return { bank, owner, a1, a2};
  }

  describe("save_withdraw", function () {
    it("save", async function () {
      const { bank, owner, a1, a2} = await loadFixture(deployBankFixture);
      console.log("bank " + await ethers.provider.getBalance(bank.address))
      console.log("a1 " + await ethers.provider.getBalance(a1.address))

      await expect(bank.connect(a1).save({value: ethers.utils.parseEther("1.0")})).not.to.be.reverted;
      console.log("bank " + await ethers.provider.getBalance(bank.address))
      console.log("a1 " + await ethers.provider.getBalance(a1.address))

      console.log("a2 " + await ethers.provider.getBalance(a2.address))
      await expect(bank.connect(a2).withdraw()).not.to.be.reverted;
      console.log("a2 " + await ethers.provider.getBalance(a2.address))
      console.log("bank " + await ethers.provider.getBalance(bank.address))
      await expect(bank.connect(a1).withdraw()).not.to.be.reverted;
      console.log("a1 " + await ethers.provider.getBalance(a1.address))
      console.log("bank " + await ethers.provider.getBalance(bank.address))
    });

  });
});
