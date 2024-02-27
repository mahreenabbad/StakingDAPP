const hre =require('hardhat')
// const stakeTokenContract = 0x246aE1ea00926a28986d9C2f45a16CBF61730A2d;
// const rewardTokenContact =0xf6D41cd911eB85ded2a89c40Dd7A0ff1c718a330;

// async function main(){
    // const staking = await hre.ethers.deployContract("Staking",(stakeTokenContract,rewardTokenContact));
    // await staking.waitForDeployment();

    // console.log(`stakeToken deployed to ${staking.target}`);
// }



  //

  const { ethers } = require("hardhat");

async function main() {
   // Deploy First

    const stakeToken = await hre.ethers.deployContract("StakeToken",[10]);
    await stakeToken.waitForDeployment();

    console.log(`stakeToken deployed to ${stakeToken.target}`)

    //deploy second
 const rewardToken = await hre.ethers.deployContract("RewardToken",[100000]);
    await rewardToken.waitForDeployment();

    console.log(`rewardToken deployed to ${rewardToken.target}`);
    //deploy third
    
    const staking = await hre.ethers.deployContract("Staking",[stakeToken.target,rewardToken.target]);
    await staking.waitForDeployment();

    console.log(`staking deployed to ${staking.target}`);


}main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });