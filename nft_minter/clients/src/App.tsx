import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';
import { MyNft__factory } from '../../typechain-types';

interface Window {
  ethereum: any;
}
declare var window: Window & typeof globalThis;

const contractAddress = '';

function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isMinting, setMining] = useState(false);

  const checkIfWalletIsConnected = useCallback(async () => {
    const { ethereum } = window;
    if (ethereum) {
      console.log('Got the ethereum obejct: ', ethereum);
    } else {
      console.log('No Wallet found. Connect Wallet');
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      console.log('Found authorized Account: ', accounts[0]);
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No authorized account found');
      await connectWallet();
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Metamask not detected');
        return;
      }

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to chain:' + chainId);

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Found account', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log('Error connecting to metamask', error);
    }
  }, []);

  const handleClickMint = useCallback(async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = MyNft__factory.connect(contractAddress, provider);
        const contractWithSigner = contract.connect(signer);

        const nftTx = await contractWithSigner.createNft();
        console.log('Mining....', nftTx.hash);
        setMining(true);

        const tx = await nftTx.wait();
        setMining(false);
        console.log('Mined!', tx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log('Error minting character', error);
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      <h2>Mint your NFT!</h2>
      <button onClick={handleClickMint}>Mint Character</button>
      {isMinting && 'Is minting....'}
    </div>
  );
}

export default App;
