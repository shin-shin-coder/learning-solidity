// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import { Base64 } from "./Base64.sol";

contract MyNft is ERC721URIStorage {
  string public collectionName;
  string public collectionSymbol;

  constructor() ERC721("MyNFT", "MY_NFT") {
    collectionName = name();
    collectionSymbol = symbol();
  }
}
