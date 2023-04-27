import { ethers, artifacts } from "hardhat";
require("dotenv").config();

async function main() {
  const url = process.env.TESTNET_ALCHEMY_URL;

  let artifact = await artifacts.readArtifact("Faucet");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.TESTNET_PRIVATE_KEY!;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    wallet
  );

  let faucet = await factory.deploy();

  console.log("Faucet address:", faucet.address);

  await faucet.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
