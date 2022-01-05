// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract ANY is ERC20 {
    constructor(uint _supply)
        ERC20("Anyswap", "ANY")
    {
        _mint(msg.sender, _supply);
    }
}