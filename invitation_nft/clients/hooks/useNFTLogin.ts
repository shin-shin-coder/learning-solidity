import { ethers } from 'ethers';
import { useState, useCallback } from 'react';
import ABI from '../artifacts/contracts/InvitationNFT.sol/InvitationNFT.json';
import config from '../config';

interface Window {
  ethereum: any;
}
declare var window: Window & typeof globalThis;

const contractAddress = config.CONTRACT_ADDRESS;

export const useNFTLogin = () => {
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

          const res = await contract.balanceOf(account);

          setIsAuthenticated(res.toNumber() > 0);
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log('Error minting character', error);
      }
    },
    [setIsAuthenticated]
  );

  return { isAuthenticated, checkNFTLogin };
};
