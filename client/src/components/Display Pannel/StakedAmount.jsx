import { useState,useEffect,useContext } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";
import StakingContext from "../../context/StakingContext"
import "./DisplayPannel.css"

const StakedAmount =()=>{
    const {stakingContract,selectedAccount} =useContext(Web3Context);
    const {isReload} =useContext(StakingContext)
    const[stakedAmount,setStakedAmount] =useState("0");

    useEffect(()=>{
        const fetchStakedBalance =async()=>{
            try {
                const amountStakedWei = await stakingContract.stakedBalance(selectedAccount);
                const amountStakedEth = ethers.formatUnits(amountStakedWei.toString(),18)
                setStakedAmount(amountStakedEth)
                
            } catch (error) {
                console.error("error while fetching",error.message)
            }
        }
        stakingContract && fetchStakedBalance()
    },[stakingContract,selectedAccount,isReload])

    return(<div className="staked-amount">
        <p>Staked Amount:</p>
        <span>{stakedAmount}</span>
        </div>
    )

}
export default StakedAmount;