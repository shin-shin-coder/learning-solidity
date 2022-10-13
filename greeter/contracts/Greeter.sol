// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Greeter {
  string private _greeting = "Hello, World!";
  address private _owner;

  constructor() {
    _owner = msg.sender;
  }

  modifier onlyOwner() {
    require(
      msg.sender == _owner,
      "Onable: caller is not the owner"
    );
    _; // Modifired function is called on a this line(`_;`).
  }

  function greet() external view returns(string memory) {
    return _greeting;
  }

  function setGreeting(string calldata greeting) external onlyOwner {
    _greeting = greeting;
  }

  function owner() public view returns(address) {
    return _owner;
  }
}
