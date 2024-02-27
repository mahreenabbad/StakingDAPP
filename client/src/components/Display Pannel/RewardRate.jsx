import { useState,useEffect,useContext } from "react";
import Web3Context from "../../context/Web3Context";
import {ethers} from "ethers";
import "./DisplayPannel.css"

const RewardRate =()=>{
    const {stakingContract,selectedAccount} =useContext(Web3Context);
    const[rewardRate,setRewardRate] =useState("0")

    useEffect(()=>{
       const fetchRewardRate =async()=>{ 
        try {
            const rateRewardWei = await stakingContract.REWARD_RATE();
            const rateRewardEth = ethers.formatUnits(rateRewardWei.toString(),18)

            console.log(rateRewardEth)
             setRewardRate(rateRewardEth)
            
        } catch (error) {
            console.error("error while fetching",error.message)
        }
       }
       stakingContract && fetchRewardRate()
    },[stakingContract,selectedAccount])
    return(
        <div className="reward-rate">
        <p>Reward Rate:</p>
        <span>{rewardRate} token/second</span>
        </div>
    )

}
export default RewardRate;