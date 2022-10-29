import { ethers } from 'ethers';
import { InvitationNFT__factory } from '../typechain-types';
import config from '../config';

// Memo: Set your own setting.
const NETWORK_URL = config.NETWORK_URL;
const PRIVATE_KEY = config.PRIVATE_KEY;
const PUBLIC_KEY = config.PUBLIC_KEY;
const CONTRACT_ADDRESS = config.CONTRACT_ADDRESS;

const RECEPIENT_KEY = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
const TOKEN_ID = 5;
const amount = 1;

const transferNFT = async () => {
  const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);

  const signer = provider.getSigner();
  const contract = InvitationNFT__factory.connect(CONTRACT_ADDRESS, provider);
  const contractWithSigner = contract.connect(signer);

  const nonce = await signer.getTransactionCount();

  const { gasPrice } = await provider.getFeeData();
  if (gasPrice === null) {
    throw new Error(`gasPrice is null.`);
  }

  const contractTx = await contractWithSigner.safeTransferFrom(
    PUBLIC_KEY,
    RECEPIENT_KEY,
    TOKEN_ID,
    amount,
    []
  );

  const tx = {
    from: PUBLIC_KEY,
    to: CONTRACT_ADDRESS,
    data: contractTx.raw,
    nonce,
    gasPrice,
  };

  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const rawTransaction = await wallet.signTransaction(tx);

  console.log('Raw txhash string ' + rawTransaction);
};

transferNFT();
