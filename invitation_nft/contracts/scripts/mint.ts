import { ethers } from 'ethers';
import { InvitationNFT__factory } from '../typechain-types';
import config from '../config';

const PRIVATE_KEY = config.PRIVATE_KEY;

// Memo: Set your own setting.
const NETWOKR = 'http://127.0.0.1:8545';
const PUBLIC_KEY = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const TOKEN_ID = 3;
const amount = 10;

const mint = async () => {
  const provider = new ethers.providers.JsonRpcProvider(NETWOKR);

  const signer = provider.getSigner();
  const contract = InvitationNFT__factory.connect(CONTRACT_ADDRESS, provider);
  const contractWithSigner = contract.connect(signer);

  const nonce = await signer.getTransactionCount();

  const { gasPrice } = await provider.getFeeData();
  if (gasPrice === null) {
    throw new Error(`gasPrice is null.`);
  }

  const contractTx = await contractWithSigner.mint(
    PUBLIC_KEY,
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

mint();
