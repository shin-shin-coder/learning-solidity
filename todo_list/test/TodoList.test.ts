import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('TodoList', () => {
  const deployContract = async () => {
    const TodoList = await ethers.getContractFactory('TodoList');
    const todoList = await TodoList.deploy();
    return { todoList };
  };

  describe('Deployment', () => {
    it('Should set the right taskCount.', async () => {
      const { todoList } = await loadFixture(deployContract);

      const actual = await todoList.taskCount();
      expect(actual).to.equal(0);
    });
  });

  describe('createTask', () => {
    it('Should increment a taskCount by 1.', async () => {
      const { todoList } = await loadFixture(deployContract);
      const beforeTaskCount = await todoList.taskCount();

      await todoList.createTask('TEST_CONTENT');

      const newTaskCount = await todoList.taskCount();
      expect(newTaskCount.sub(beforeTaskCount)).to.equal(1);
    });

    it('Should set a new task.', async () => {
      const { todoList } = await loadFixture(deployContract);

      await todoList.createTask('TEST_CONTENT');

      const newTask = await todoList.tasks(0);

      expect(newTask.isCompleted).to.equal(false);
      expect(newTask.content).to.equal('TEST_CONTENT');
    });

    it('Should emit an event.', async () => {
      const { todoList } = await loadFixture(deployContract);

      await expect(todoList.createTask('TEST_CONTENT'))
        .to.emit(todoList, 'Created')
        .withArgs(1, 'TEST_CONTENT');
    });
  });

  describe('getTasks', () => {
    const setUp = async () => {
      const { todoList } = await loadFixture(deployContract);
      await todoList.createTask('TEST_CONTENT1');
      await todoList.createTask('TEST_CONTENT2');

      return { todoList };
    };

    it('Should return tasks', async () => {
      const { todoList } = await setUp();

      const res = await todoList.getTasks();

      expect(res.length).to.equal(2);
      expect(res[0].content).to.equal('TEST_CONTENT1');
      expect(res[0].isCompleted).to.equal(false);
      expect(res[1].content).to.equal('TEST_CONTENT2');
      expect(res[1].isCompleted).to.equal(false);
    });
  });

  describe('toggleIsCompleted', () => {
    const targetId = 1;

    const setUp = async () => {
      const { todoList } = await loadFixture(deployContract);
      await todoList.createTask('TEST_CONTENT1');
      await todoList.createTask('TEST_CONTENT2');

      return { todoList };
    };

    it('Should update isCompleted of a target task.', async () => {
      const { todoList } = await setUp();

      await todoList.toggleIsCompleted(targetId);

      const task = await todoList.tasks(targetId);
      expect(task.isCompleted).to.equal(true);
    });

    it('Should emit a UpdatedIsCompleted event.', async () => {
      const { todoList } = await setUp();

      await expect(todoList.toggleIsCompleted(targetId))
        .to.emit(todoList, 'UpdatedIsCompleted')
        .withArgs(targetId, true);
    });
  });
});
