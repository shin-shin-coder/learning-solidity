import { ethers } from 'ethers';
import { InvitationNFT__factory } from '../typechain-types';

// Memo: Set your own setting.
const NETWOKR = 'http://127.0.0.1:8545';
const CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const PUBLIC_KEY = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const RECEPIENT_ADDRESS = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
const TOKEN_ID = 5;

async function viewNFT() {
  const provider = new ethers.providers.JsonRpcProvider(NETWOKR);
  const contract = InvitationNFT__factory.connect(CONTRACT_ADDRESS, provider);
  const publicNum = await contract.balanceOf(PUBLIC_KEY, TOKEN_ID);

  const recepientNum = await contract.balanceOf(RECEPIENT_ADDRESS, TOKEN_ID);

  console.log(`Token ID: ${TOKEN_ID}`);
  console.log('-----------');
  console.log(`KEY: ${PUBLIC_KEY}`);
  console.log(`Amount: ${publicNum.toNumber()}.`);
  console.log('-----------');
  console.log(`KEY: ${RECEPIENT_ADDRESS}`);
  console.log(`Amount: ${recepientNum.toNumber()}.`);
}

viewNFT();
