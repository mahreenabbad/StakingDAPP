import { useState,useEffect,useContext } from "react";
import Web3Context from "../../context/Web3Context";
import {ethers} from "ethers";
import "./DisplayPannel.css"

const EarnedReward =()=>{
    const {stakingContract,selectedAccount} =useContext(Web3Context);
    const[rewardVal,setRewardVal] =useState("0")
    
    useEffect(()=>{
        const fetchEarnedReward=async()=>{
            try {
                const earnedRewardWei = await stakingContract.earned(selectedAccount);
                const earnedRewardEth = ethers.formatUnits(earnedRewardWei.toString(),18)
                const roundedReward = parseFloat(earnedRewardEth).toFixed(2)
    
                // console.log(roundedReward)
                setRewardVal(roundedReward)
            } catch (error) {
                console.error("error while fetching",error.message)
            }
            }

            const interval = setInterval(()=>{
                console.log("hi")
                stakingContract && fetchEarnedReward()
            },20000)
            return ()=> clearInterval(interval)
        
    },[stakingContract,selectedAccount])
    return(
        <div className="earned-reward">
        <p>Earned Reward Value:</p>
        <span>{rewardVal}</span>
        </div>
    )

}
export default EarnedReward;