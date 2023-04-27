import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: process.env.TESTNET_ALCHEMY_URL,
      accounts: [process.env.TESTNET_PRIVATE_KEY!]
    }
  }
};

export default config;
