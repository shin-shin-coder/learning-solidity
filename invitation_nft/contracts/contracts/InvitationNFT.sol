// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract InvitationNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenCounter;

    constructor() ERC721("InvitationNFT", "INV") {}

    function mintAndTransfer(address _to) public {
        _tokenCounter.increment();

        uint256 _newItemId = _tokenCounter.current();
        _safeMint(msg.sender, _newItemId);
        safeTransferFrom(msg.sender, _to, _newItemId);
    }
}
