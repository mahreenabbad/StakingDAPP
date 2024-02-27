
import {useState,useContext,useRef} from "react"
import {ethers} from "ethers";
import Button from "../Button/Button";
import Web3Context from "../../context/Web3Context";
import StakingContext from '../../context/StakingContext'
import { toast } from "react-hot-toast";
import "./StakeToken.css";
const StakeAmount=()=>{

    const {stakingContract} =useContext(Web3Context);
    const stakeAmountRef =useRef();
    const [transactionStatus,setTransactionStatus] =useState("")
    const {isReload,setIsReload} =useContext(StakingContext)

    const stakeToken=async(e)=>{
     e.preventDefault();
     const amount = stakeAmountRef.current.value.trim();
     if(isNaN(amount) || amount<=0){
        console.error("enter a valid positive number");
        return;
     }
     const amountToStake = ethers.parseUnits(amount,18).toString();
     try {
        const transaction = await stakingContract.stake(amountToStake)
        await toast.promise(transaction.wait(),
        {
          loading: "Transaction is pending...",
          success: 'Transaction successful 👌',
          error: 'Transaction failed 🤯'
        });
        stakeAmountRef.current.value = "";
        setTransactionStatus("Staking Successfull")
        setIsReload(!isReload)
     } catch (error) {
        console.error("Staking Failed", error.message)
     }
    }
    return(
        <div>
            {transactionStatus && <div>{transactionStatus}</div>}
            <form onSubmit={stakeToken} className="stake-amount-form">
                <label className="stake-input-label">Amount To Stake :</label>
                <input type="text" ref={stakeAmountRef}></input>
                <Button onClick={stakeToken} type="submit"  label="Stake Token"></Button>

            </form>
        </div>
    )
}
export default StakeAmount