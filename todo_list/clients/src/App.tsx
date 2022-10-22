import { FC, useEffect, useState, useCallback } from 'react';
import './App.css';
import { ethers } from 'ethers';
import artifact from './contracts/TodoList.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const useTodoList = (contract: ethers.Contract) => {
  const [count, setCount] = useState<number>();

  const getTaskCount = useCallback(async () => {
    const res = await contract.functions.taskCount();
    setCount(res[0].toNumber());
  }, [contract]);

  useEffect(() => {
    getTaskCount();
  }, []);

  return { count };
};

const App: FC = () => {
  const provider = new ethers.providers.JsonRpcProvider();
  const contract = new ethers.Contract(contractAddress, artifact.abi, provider);

  const { count } = useTodoList(contract);

  return (
    <div className="container">
      <h1>TodoList</h1>
      <p>タスク件数: {count}件</p>
    </div>
  );
};

export default App;
