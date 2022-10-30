import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('InvitationNFT', () => {
  const deployContract = async () => {
    const InvitationNFT = await ethers.getContractFactory('InvitationNFT');
    const signers = await ethers.getSigners();
    const contract = await InvitationNFT.deploy();
    return { contract, signers };
  };

  describe('mintAndTransfer', () => {
    it('Should mint successfully by owner.', async () => {
      const { contract, signers } = await loadFixture(deployContract);

      const addr1 = await signers[1].getAddress();

      const tx = await contract.mintAndTransfer(addr1);
      await tx.wait();

      expect(await contract.ownerOf(1)).to.be.equal(addr1);
    });

    it('Should mint successfully by a member who have nft.', async () => {
      const { contract, signers } = await loadFixture(deployContract);

      // Setup: Mint to signer1 from owner
      const signer1 = signers[1];
      const addr1 = await signer1.getAddress();
      const tx = await contract.mintAndTransfer(addr1);
      await tx.wait();

      // Mint to signer2 from signer1 who have nft.
      const contractWithSigner = contract.connect(signer1);
      const addr2 = await signers[2].getAddress();
      const tx2 = await contractWithSigner.mintAndTransfer(addr2);
      await tx2.wait();

      expect(await contract.ownerOf(2)).to.be.equal(addr2);
    });

    it('Should mint unsuccessfully by not owner or a member who have nft.', async () => {
      const { contract, signers } = await loadFixture(deployContract);

      const signer1 = signers[1];
      const addr2 = await signers[2].getAddress();

      await expect(
        contract.connect(signer1).mintAndTransfer(addr2)
      ).to.be.revertedWith(
        'Error: caller is not the owner or a member who have nft'
      );
    });
  });
});
