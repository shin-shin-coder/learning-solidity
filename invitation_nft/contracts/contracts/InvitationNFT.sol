// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract InvitationNFT is ERC721, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenCounter;

    mapping(address => uint256) private invitedCount;

    constructor() ERC721("InvitationNFT", "INV") {}

    modifier onlyOwnerOrMember() {
        require(
            msg.sender == owner() || balanceOf(msg.sender) >= 1,
            'Error: caller is not the owner or a member who have nft'
        );
        _;
    }

    modifier canInvite() {
        require(
            msg.sender == owner() || invitedCount[msg.sender] < 2,
            'Error: a number of invitation is over limit'
        );
        _;
    }

    function mintAndTransfer(address _to) public onlyOwnerOrMember canInvite {
        _tokenCounter.increment();

        uint256 _newItemId = _tokenCounter.current();
        _safeMint(msg.sender, _newItemId);
        safeTransferFrom(msg.sender, _to, _newItemId);

        invitedCount[msg.sender] = invitedCount[msg.sender].add(1);
    }
}
