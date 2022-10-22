import { FC } from 'react';
import './App.css';
import { ethers } from 'ethers';
import artifact from './contracts/TodoList.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const App: FC = () => {
  const provider = new ethers.providers.JsonRpcProvider();
  const contract = new ethers.Contract(contractAddress, artifact.abi, provider);

  console.log(contract);

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};

export default App;
