//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Faucet {
  mapping(address => uint256) withdrawals;

  // Constant representing half a day in seconds
  uint256 constant HALF_DAY = 43200;
  
  function withdraw(uint _amount) public {
    // users can only withdraw every 12 hours
    if (checkUser(msg.sender)) {
      require(withdrawals[msg.sender] + HALF_DAY <= block.timestamp, "Withdrawal limit reached");
    }

    // users can only withdraw .5 ETH at a time, feel free to change this!
    require(_amount <= 500000000000000000);
    
    payable(msg.sender).transfer(_amount);
    withdrawals[msg.sender] = block.timestamp;
  }

  function checkUser(address user_add) internal view returns (bool) {
    return abi.encodePacked(withdrawals[user_add]).length > 0 ? true : false;
  }

  // fallback function
  receive() external payable {}
}