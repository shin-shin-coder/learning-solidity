import { ethers } from 'ethers';
import { useState, useCallback } from 'react';
import ABI from '../artifacts/contracts/InvitationNFT.sol/InvitationNFT.json';

interface Window {
  ethereum: any;
}
declare var window: Window & typeof globalThis;

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const useNFTLogin = (nftId: number) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  const checkNFTLogin = useCallback(
    async (account: string) => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const contract = new ethers.Contract(
            contractAddress,
            ABI.abi,
            provider
          );

          const res = await contract.balanceOf(account, nftId);

          setIsAuthenticated(res.toNumber() > 0);
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log('Error minting character', error);
      }
    },
    [setIsAuthenticated, nftId]
  );

  return { isAuthenticated, checkNFTLogin };
};
