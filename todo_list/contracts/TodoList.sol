//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TodoList {
  struct Task {
    string content;
    bool isCompleted;
  }

  event Created(uint256 id, string content);
  event UpdatedIsCompleted(uint256 id, bool isCompleted);

  Task[] public tasks;

  function createTask(string memory _content) public {
    tasks.push(Task({ content: _content, isCompleted: false }));
    emit Created(taskCount(), _content);
  }

  function getTasks() public view returns(Task[] memory coll) {
    uint256 size = taskCount();
    coll = new Task[](size);
    for(uint256 i = 0; i < size; i++) {
      coll[i] = tasks[i];
    }
    return coll;
  }

  function taskCount() public view returns(uint256) {
    return tasks.length;
  }

  function toggleIsCompleted(uint256 _id) public {
    Task memory _task = tasks[_id];
    _task.isCompleted = !_task.isCompleted;
    tasks[_id] = _task;
    emit UpdatedIsCompleted(_id, _task.isCompleted);
  }
}
