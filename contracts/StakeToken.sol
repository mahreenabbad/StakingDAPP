// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakeToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("StakeToken", "STK") {
        _mint(msg.sender, initialSupply*10**18);
    }
   
}