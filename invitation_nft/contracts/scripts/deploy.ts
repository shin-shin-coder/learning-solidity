import { ethers } from 'hardhat';

async function main() {
  const InvitationNFT = await ethers.getContractFactory('InvitationNFT');
  const contract = await InvitationNFT.deploy();
  await contract.deployed();
  console.log(`InvitationNFT was deployed to ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
