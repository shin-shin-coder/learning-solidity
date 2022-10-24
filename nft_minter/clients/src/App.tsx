import { useState, useEffect, useCallback } from 'react';

interface Window {
  ethereum: any;
}
declare var window: Window & typeof globalThis;

function App() {
  const [currentAccount, setCurrentAccount] = useState('');

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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
