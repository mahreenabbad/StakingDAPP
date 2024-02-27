
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// import "node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";


library SafeMath {

  function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
    if (a == 0) {
      return 0;
    }
    c = a * b;
    assert(c / a == b);
    return c;
  }
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    // uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return a / b;
  }

  
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  
  function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
    c = a + b;
    assert(c >= a);
    return c;
  }
}

contract Staking is ReentrancyGuard {
    using SafeMath for uint256;
   IERC20 public s_stakingToken;
   IERC20 public s_rewardToken;

   uint public constant REWARD_RATE=1e18;//10token per second
   uint private totalStakedTokens;
   uint public rewardPerTokenStored;
   uint public lastUpdateTime;

   mapping (address=>uint) public stakedBalance;
   mapping (address=>uint) public rewards;
   mapping (address=>uint) public userRewardPerTokenPaid;

   event Staked(address indexed user, uint256 indexed amount);
   event Withdrwan(address indexed user, uint256 indexed amount);
   event RewardsClaimed(address indexed user, uint256 indexed amount); 

   constructor(address stakingToken, address rewardToken){
    s_stakingToken =IERC20(stakingToken);
    s_rewardToken =IERC20(rewardToken);
   }

   function rewardPerToken()public view returns (uint){
    if(totalStakedTokens==0){
        return rewardPerTokenStored;
    }
    uint totalTime = block.timestamp.sub(lastUpdateTime);
    uint totalRewards = REWARD_RATE.mul(totalTime);
    return rewardPerTokenStored.add(totalRewards.mul(1e18).div(totalStakedTokens));
   }

   function earned(address account)public view returns(uint){
    return stakedBalance[account].mul(rewardPerToken().sub(userRewardPerTokenPaid[account])).div(1e18).add(rewards[account]);
   }
   modifier updateReward(address account){
    rewardPerTokenStored = rewardPerToken();
    lastUpdateTime= block.timestamp;
    rewards[account]=earned(account);
    userRewardPerTokenPaid[account]= rewardPerTokenStored;
    _;
   }
   function stake(uint amount) external nonReentrant updateReward(msg.sender){
    require(amount>0,"Amount should be greater than zero");
    totalStakedTokens+=amount;
    stakedBalance[msg.sender]+=amount;
    emit Staked(msg.sender, amount);

    bool success = s_stakingToken.transferFrom(msg.sender,address(this),amount);
    require(success,"Transfer Failed");
   }
    function withdraw(uint amount) external nonReentrant updateReward(msg.sender){
    require(amount>0,"Amount should be greater than zero");
    require(stakedBalance[msg.sender]>= amount,"Staked amount not enough");
    totalStakedTokens-=amount;
    stakedBalance[msg.sender]-=amount;
    emit Withdrwan(msg.sender, amount);

    bool success = s_stakingToken.transfer(msg.sender,amount);
    require(success,"Transfer Failed");
   }
    function getReward() external nonReentrant updateReward(msg.sender){
    uint reward = rewards[msg.sender];
    require(reward>0,"No Rewards to Claim");
    rewards[msg.sender] =0;
    emit RewardsClaimed(msg.sender, reward);

    bool success = s_rewardToken.transfer(msg.sender,reward);
    require(success,"Transfer Failed");
   }

}