import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("test", function () {
  async function deployFixture() {
    const [owner, a1, a2] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("A9Proxy");
    const factory2 = await ethers.getContractFactory("A9Token1");
    const factory3 = await ethers.getContractFactory("A9Token2");
    const c = await factory.deploy();
    const c2 = await factory2.deploy();
    const c3 = await factory3.deploy();


    return { c, c2, c3, owner, a1, a2};
  }

  describe("main", function () {
    it("test", async function () {
      console.log("start")
      const { c, c2, c3, owner, a1, a2} = await loadFixture(deployFixture);

      console.log(await c.totalSupply())
      console.log(await c.balanceOf(owner.address))
      console.log(await c.balanceOf(a1.address))
      console.log(await c.decimals())
      console.log(await c.num())
      await c.transfer(a1.address, 10000)
      console.log(await c.balanceOf(owner.address))
      console.log(await c.balanceOf(a1.address))

      await c.upgrade(c3.address)
      const n = await ethers.getContractAt("A9Token2", c.address)
      await n.connect(owner).transferWithCallback(a1.address, 10000)
      console.log(await c.num())
      console.log(await c.balanceOf(owner.address))
      console.log(await c.balanceOf(a1.address))

      console.log("end")
    });

  });
});
