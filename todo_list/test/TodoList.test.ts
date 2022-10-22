import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('TodoList', function () {
  async function deployContract() {
    const TodoList = await ethers.getContractFactory('TodoList');
    const todoList = await TodoList.deploy();
    return { todoList };
  }

  describe('Deployment', function () {
    it('Should set the right taskCount.', async function () {
      const { todoList } = await loadFixture(deployContract);

      const actual = await todoList.taskCount();
      expect(actual).to.equal(0);
    });
  });

  describe('createTask', function () {
    it('Should increment a taskCount by 1.', async function () {
      const { todoList } = await loadFixture(deployContract);
      const beforeTaskCount = await todoList.taskCount();

      await todoList.createTask('TEST_CONTENT');

      const newTaskCount = await todoList.taskCount();
      expect(newTaskCount.sub(beforeTaskCount)).to.equal(1);
    });

    it('Should set a new task.', async function () {
      const { todoList } = await loadFixture(deployContract);

      await todoList.createTask('TEST_CONTENT');

      const newTask = await todoList.tasks(0);

      expect(newTask.isCompleted).to.equal(false);
      expect(newTask.content).to.equal('TEST_CONTENT');
    });

    it('Should emit an event.', async function () {
      const { todoList } = await loadFixture(deployContract);

      await expect(todoList.createTask('TEST_CONTENT'))
        .to.emit(todoList, 'Created')
        .withArgs(1, 'TEST_CONTENT');
    });
  });
});
