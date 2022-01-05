// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract WETH is ERC20 {
    constructor(uint _supply)
        ERC20("Wrapped ETH", "WETH")
    {
        _mint(msg.sender, _supply);
    }
}