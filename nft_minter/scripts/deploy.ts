import { ethers } from 'hardhat';

async function main() {
  const MyNft = await ethers.getContractFactory('MyNft');
  const myNft = await MyNft.deploy();
  await myNft.deployed();
  console.log(`MyNft deployed to: ${myNft.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
