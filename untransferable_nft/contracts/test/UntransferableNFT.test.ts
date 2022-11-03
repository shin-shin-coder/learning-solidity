import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('UntransferableNFT', () => {
  const deployContract = async () => {
    const InvitationNFT = await ethers.getContractFactory('UntransferableNFT');
    const signers = await ethers.getSigners();
    const contract = await InvitationNFT.deploy();
    return { contract, signers };
  };

  describe('mint', () => {
    it('Should mint.', async () => {
      const { contract } = await loadFixture(deployContract);

      const beforeCount = (await contract.getTotalSupply()).toNumber();

      const tx = await contract.mint();
      await tx.wait();

      const afterCount = (await contract.getTotalSupply()).toNumber();
      expect(afterCount - beforeCount).to.be.equal(1);
    });
  });

  describe('transfer', () => {
    it('Should transfer unsuccessfully', async () => {
      const { contract, signers } = await loadFixture(deployContract);
      const ownerAddr = await signers[0].getAddress();
      const addr1 = await signers[1].getAddress();

      const tx = await contract.mint();
      await tx.wait();

      const tokenId = 1;
      await expect(
        contract.transferFrom(ownerAddr, addr1, tokenId)
      ).to.be.revertedWith(
        'Error: UntransferableNFT is not permitted to be transferred'
      );
    });
  });
});
