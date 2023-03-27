import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("test", function () {
  async function deployFixture() {
    const [owner, a1, a2] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("A9Token");
    const factory2 = await ethers.getContractFactory("Vault");
    const factory3 = await ethers.getContractFactory("A9Nft");
    const c = await factory.deploy();
    const vault = await factory2.deploy();
    const nft = await factory3.deploy();


    return { c, vault, nft, owner, a1, a2};
  }

  describe("main", function () {
    it("test", async function () {
      console.log("start")
      const { c, vault, nft, owner, a1, a2} = await loadFixture(deployFixture);

      console.log(await c.totalSupply())
      console.log(await c.balanceOf(owner.address))
      console.log(await c.balanceOf(a1.address))
      console.log(await c.decimals())
      await c.approve(vault.address, 1000000000000000)
      console.log("vault " + await c.balanceOf(vault.address))
      console.log("owner " + await c.balanceOf(owner.address))
      console.log(await vault.deposit(c.address, 10000))
      console.log("vault " + await c.balanceOf(vault.address))
      console.log("owner " + await c.balanceOf(owner.address))
      console.log(await vault.withdraw(c.address))
      console.log("vault " + await c.balanceOf(vault.address))
      console.log("owner " + await c.balanceOf(owner.address))

      console.log("a1 " + await c.balanceOf(a1.address))
      await c.transfer(a1.address, 10000)
      console.log("a1 " + await c.balanceOf(a1.address))

      console.log("nft owner " + await nft.balanceOf(owner.address))
      await nft.approve(vault.address, 0)
      await vault.listNft(nft.address, 0, c.address, 8000)
      console.log("nft a1 " + await nft.balanceOf(a1.address))
      await c.connect(a1).approve(vault.address, 1000000000000000)
      await vault.connect(a1).buyNft(nft.address, 0, c.address)
      console.log("a1 " + await c.balanceOf(a1.address))
      console.log("nft a1 " + await nft.balanceOf(a1.address))
      console.log("end")
    });

  });
});
