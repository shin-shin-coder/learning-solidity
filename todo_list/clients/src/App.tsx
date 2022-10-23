import { FC, useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { TodoList__factory, TodoList } from '../../typechain-types';
import './App.css';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

type Task = {
  content: string;
  isCompleted: boolean;
};

const useTodoList = (contract: TodoList) => {
  const [tasks, setTasks] = useState<Task[]>();

  const getTasks = useCallback(async () => {
    const { coll } = await contract.functions.getTasks();
    const tasks = coll.map((c) => {
      return {
        content: c.content,
        isCompleted: c.isCompleted,
      };
    });
    setTasks(tasks);
  }, [contract]);

  useEffect(() => {
    getTasks();
  }, []);

  return { tasks };
};

const App: FC = () => {
  const provider = new ethers.providers.JsonRpcProvider();
  const contract = TodoList__factory.connect(contractAddress, provider);
  const { tasks } = useTodoList(contract);

  if (tasks === undefined) {
    return (
      <div className="container">
        <h1>TodoList</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>TodoList</h1>
      <p>タスク件数: {tasks.length}件</p>
    </div>
  );
};

export default App;
