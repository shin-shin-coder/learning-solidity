// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract UntransferableNFT is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenCounter;

  constructor() ERC721("UntransferableNFT", "UNTRANSFER") {}

  function mint() public {
    _tokenCounter.increment();
    uint256 _newItemId = _tokenCounter.current();
    _safeMint(msg.sender, _newItemId);
  }

  function _beforeTokenTransfer(address from, address, uint256) internal pure override {
    require(from == address(0), 'Error: UntransferableNFT is not permitted to be transferred');
  }

  function getTotalSupply() external view returns(uint256) {
    return _tokenCounter.current();
  }
}
