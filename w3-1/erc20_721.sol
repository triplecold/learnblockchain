//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract A9Token is ERC20 {
    constructor() ERC20("Asset Nine", "A9") {
        _mint(msg.sender, 100000);
    }
}

contract A9Nft is ERC721 {
    constructor() ERC721("Asset Nine", "A9") {
        _mint(msg.sender, 0);
    }
}

contract Vault {
    constructor() {
    }
    mapping(address => mapping(address => uint)) balance;
    mapping(address => mapping(uint => mapping(address => uint))) order_price;
    mapping(address => mapping(uint => mapping(address => address))) order_owner;

    function deposit(address token, uint val) public {
        require(IERC20(token).transferFrom(msg.sender, address(this), val), "transfer");
        balance[address(token)][msg.sender] = val;
    }

    function withdraw(address token) public {
        if (balance[address(token)][msg.sender] > 0) {
            require(IERC20(token).transfer(msg.sender, balance[address(token)][msg.sender]), "transfer");
        }
    }

    function listNft(address nft, uint nft_id, address token, uint price) public {
        require(IERC721(nft).getApproved(nft_id) == address(this));
        order_price[nft][nft_id][token] = price;
        order_owner[nft][nft_id][token] = msg.sender;
    }

    function buyNft(address nft, uint nft_id, address token) public {
        require(IERC20(token).transferFrom(msg.sender, order_owner[nft][nft_id][token], order_price[nft][nft_id][token]), "transfer token");
        IERC721(nft).transferFrom(order_owner[nft][nft_id][token], msg.sender, nft_id);
    }
}
