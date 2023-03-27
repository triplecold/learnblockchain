//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

library StorageSlot {
    struct AddressSlot {
        address value;
    }

    function getAddressSlot(
        bytes32 slot
    ) internal pure returns (AddressSlot storage r) {
        assembly {
            r.slot := slot
        }
    }
}

contract A9Proxy is ERC20 {
    uint public num;
    bytes32 private constant IMPLEMENTATION_SLOT =
        bytes32(uint(keccak256("eip1967.proxy.implementation")) - 1);
    bytes32 private constant ADMIN_SLOT =
        bytes32(uint(keccak256("eip1967.proxy.admin")) - 1);

    constructor() ERC20("Asset Nine", "A9") {
        _mint(msg.sender, 100000);
        StorageSlot.getAddressSlot(ADMIN_SLOT).value = msg.sender;
    }

    fallback() external payable {
        (bool ok, bytes memory res) = StorageSlot.getAddressSlot(IMPLEMENTATION_SLOT).value.delegatecall(msg.data);
        require(ok, "delegatecall failed");
        num += 1;
    }

    function upgrade(address new_impl) public {
        require(msg.sender == address(StorageSlot.getAddressSlot(ADMIN_SLOT).value));
        StorageSlot.getAddressSlot(IMPLEMENTATION_SLOT).value = new_impl;
    }
}

contract A9Token1 is ERC20 {
    uint public num;
    constructor() ERC20("Asset Nine", "A9") {
    }
}

contract A9Token2 is ERC20 {
    uint public num;
    constructor() ERC20("Asset Nine", "A9") {
    }

    function transferWithCallback(address recipient, uint256 amount) external returns (bool) {
        return transfer(recipient, amount);
    }
}

