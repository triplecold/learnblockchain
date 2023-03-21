//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

interface IScore {
    function update(address student, uint score) external;
}

contract Teacher {
    constructor() {
    }
    
    function update(address score_addr, address student, uint score) public{
      IScore(score_addr).update(student, score);
    }
}

contract Score {
    address public teacher;
    address public last_sender;
    mapping(address => uint) public scores;

    constructor() {
      teacher = address(new Teacher());
    }

    modifier onlyTeacher() {
      require(msg.sender == teacher);
      _;
    }

    function update(address student, uint score) public onlyTeacher {
      require(score <= 100);
      last_sender = msg.sender;
      scores[student] = score;
    }
}

