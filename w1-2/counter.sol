//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Counter {
    uint public counter;
    address public owner;
    constructor() {
        counter = 0;
        owner = msg.sender;
    }

    function count() public {
        require(msg.sender == owner);
        counter = counter + 1;
    }

    function add(uint x) public {
        counter = counter + x;
    }
}


