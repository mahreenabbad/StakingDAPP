require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const API_KEY = process.env.ALCHEMY_API_KEY;

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_KEY = process.env.SEPOLIA_PRIVATE_KEY;

module.exports = {
  solidity: { compilers: [{ version: "0.8.2", },{ version: "0.8.19", },
   { version: "0.8.23", }, { version: "0.4.0", settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  }, }], },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`,
      accounts: [SEPOLIA_KEY]
    }
  }
};
