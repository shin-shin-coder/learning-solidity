// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

contract InvitationNFT is ERC1155PresetMinterPauser {
    constructor() ERC1155PresetMinterPauser("http://localhost:3000/{id}.json") {}
}
