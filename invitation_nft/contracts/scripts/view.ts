import { ethers } from 'ethers';
import { InvitationNFT__factory } from '../typechain-types';
import config from '../config';

// Memo: Set your own setting.
const NETWORK_URL = config.NETWORK_URL;
const PUBLIC_KEY = config.PUBLIC_KEY;
const CONTRACT_ADDRESS = config.CONTRACT_ADDRESS;

async function viewNFT() {
  const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
  const contract = InvitationNFT__factory.connect(CONTRACT_ADDRESS, provider);
  const res = await contract.balanceOf(PUBLIC_KEY);

  console.log(`KEY: ${PUBLIC_KEY}`);
  console.log(`Amount: ${res.toNumber()}.`);
}

viewNFT();
