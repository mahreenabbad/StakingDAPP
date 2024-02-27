
import {useContext,useRef} from "react"
import {ethers} from "ethers";
import Button from "../Button/Button";
import Web3Context from "../../context/Web3Context";
import StakingContext from '../../context/StakingContext'
import { toast } from "react-hot-toast";
import "./Withdraw.css"

const Withdraw=()=>{

    const {stakingContract} =useContext(Web3Context);
    const {isReload,setIsReload} =useContext(StakingContext)
    
    const withdrawStakeAmountRef =useRef();

    const withdrawStakeToken=async(e)=>{
     e.preventDefault();
     const amount = withdrawStakeAmountRef.current.value.trim();
     if(isNaN(amount) || amount<=0){
        console.error("enter a valid positive number");
        return;
     }
     const amountToWithdraw = ethers.parseUnits(amount,18).toString();
     try {
        const transaction = await stakingContract.withdraw(amountToWithdraw)
        await toast.promise(transaction.wait(),
        {
          loading: "Transaction is pending...",
          success: 'Transaction successful 👌',
          error: 'Transaction failed 🤯'
        });
        withdrawStakeAmountRef.current.value = "";  
        setIsReload(!isReload)
     } catch (error) {
        console.error("Withdrawal Failed", error.message)
     }
    }
    return(
        
            
            <form className="withdraw-form" onSubmit={withdrawStakeToken}>
                <label>Amount To Withdraw :</label>
                <input type="text" ref={withdrawStakeAmountRef}></input>
                <Button onClick={withdrawStakeToken} type="submit"  label="Withdraw Staked Token"></Button>

            </form>
        
    )
}
export default Withdraw