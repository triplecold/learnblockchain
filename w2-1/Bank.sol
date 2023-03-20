//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Bank{
    mapping(address => uint) balance;
    struct Record {
        address from;
        uint value;
        uint8 is_withdraw;
    }
    Record[] public records;

    constructor() {
    }

    function save() payable public {
        balance[msg.sender] += msg.value;
        records.push(Record({from : msg.sender, value : msg.value, is_withdraw : 0}));
    }

    function withdraw() public {
        if (balance[msg.sender] > 0) {
            records.push(Record({from : msg.sender, value : balance[msg.sender], is_withdraw : 1}));
            payable(msg.sender).transfer(balance[msg.sender]);
            balance[msg.sender] = 0;
        }
    }
}


