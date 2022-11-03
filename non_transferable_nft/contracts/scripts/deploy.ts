import { ethers } from 'hardhat';

async function main() {
  const NonTransferableNFT = await ethers.getContractFactory(
    'NonTransferableNFT'
  );
  const contract = await NonTransferableNFT.deploy();
  await contract.deployed();
  console.log(`NonTransferableNFT was deployed to ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
