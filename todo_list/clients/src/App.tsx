import { FC, useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { TodoList__factory, TodoList } from '../../typechain-types';
import './App.css';

const contractAddress = '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e';

type Task = {
  id: number;
  content: string;
  isCompleted: boolean;
};

const useTodoList = (contract: TodoList) => {
  const [tasks, setTasks] = useState<Task[]>();

  const getTasks = useCallback(async () => {
    const { coll } = await contract.functions.getTasks();
    const tasks = coll.map((c, i) => {
      return {
        id: i,
        content: c.content,
        isCompleted: c.isCompleted,
      };
    });
    setTasks(tasks);
  }, [contract]);

  const [content, setContent] = useState('');

  const handleChangeContent: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setContent(e.target.value);
    }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (content === '') {
        return;
      }

      await contract.functions.createTask(content);
      await getTasks();
    },
    [content, contract, getTasks]
  );

  useEffect(() => {
    getTasks();
  }, []);

  return { tasks, handleChangeContent, content, handleSubmit };
};

const App: FC = () => {
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner();
  const contract = TodoList__factory.connect(contractAddress, provider);
  const contractWithSigner = contract.connect(signer);
  const { tasks, content, handleChangeContent, handleSubmit } =
    useTodoList(contractWithSigner);

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChangeContent}
          value={content}
          placeholder="内容を入力してください"
        />
        <button type="submit">タスクを作成する</button>
      </form>
      <p>タスク件数: {tasks.length}件</p>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>内容</th>
            <th>完了</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.id + 1}</td>
                <td>{task.content}</td>
                <td>{task.isCompleted ? 'Completed' : ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
