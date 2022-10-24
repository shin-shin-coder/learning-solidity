import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MyNft', () => {
  const deployContract = async () => {
    const MyNft = await ethers.getContractFactory('MyNft');
    const myNft = await MyNft.deploy();
    return { myNft };
  };

  describe('Deployment', () => {
    it('Should have an address.', async () => {
      const { myNft } = await loadFixture(deployContract);
      expect(myNft.address).not.to.equal(undefined);
    });

    it('Should have a name.', async () => {
      const { myNft } = await loadFixture(deployContract);

      const actual = await myNft.collectionName();
      expect(actual).to.equal('MyNFT');
    });

    it('Should have a symbol.', async () => {
      const { myNft } = await loadFixture(deployContract);

      const actual = await myNft.collectionSymbol();
      expect(actual).to.equal('MY_NFT');
    });
  });

  describe('createNft', () => {
    it('Should emit Created event.', async () => {
      const { myNft } = await loadFixture(deployContract);

      await expect(await myNft.createNft())
        .to.emit(myNft, 'Created')
        .withArgs(0);

      await expect(await myNft.createNft())
        .to.emit(myNft, 'Created')
        .withArgs(1);
    });
  });
});
