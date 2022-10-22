//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TodoList {
  struct Task {
    string content;
    bool isCompleted;
  }

  event Created(uint256 id, string content);

  Task[] public tasks;

  function createTask(string memory _content) public {
    tasks.push(Task({ content: _content, isCompleted: false }));
    emit Created(taskCount(), _content);
  }

  function taskCount() public view returns(uint256) {
    return tasks.length;
  }
}
