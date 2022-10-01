const hre = require("hardhat");
const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
  const BlogFactory = await hre.ethers.getContractFactory("Blog");
  const blog = await BlogFactory.deploy();
  console.log("Blog deployed to:", blog.address);

  const RecordFactory = await hre.ethers.getContractFactory("Record");
  const record = await RecordFactory.deploy();
  console.log("Record deployed to:", record.address);

  fs.writeFileSync(
    "./config.js",
    `
    export const blogAddress = "${blog.address}"
    export const recordAddress = "${record.address}"
  `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
