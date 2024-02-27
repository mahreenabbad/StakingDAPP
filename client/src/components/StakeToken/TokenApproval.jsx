
import {useState,useContext,useRef} from "react"
import {ethers} from "ethers";
import Button from "../Button/Button";
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
import "./StakeToken.css"

const TokenApproval=()=>{
    const {stakeTokenContract,stakingContract} =useContext(Web3Context);
    const approvedTokenRef =useRef();
    const [transactionStatus,setTransactionStatus] =useState("")

    const approveToken=async(e)=>{
     e.preventDefault();
     const amount = approvedTokenRef.current.value.trim();
     if(isNaN(amount) || amount<=0){
        console.error("enter a valid positive number");
        return;
     }
     const amountToSend = ethers.parseUnits(amount,18).toString();
     try {
        const transaction = await stakeTokenContract.approve(stakingContract.target,amountToSend)
        await toast.promise(transaction.wait(),
        {
          loading: "Transaction is pending...",
          success: 'Transaction successful 👌',
          error: 'Transaction failed 🤯'
        });
        approvedTokenRef.current.value = "";
        setTransactionStatus("Transaction Success")
     } catch (error) {
        console.error("TokenApproval Failed", error.message)
     }
    }
    return(
        <div>
            {transactionStatus && <div>{transactionStatus}</div>}
            <form onSubmit={approveToken} className="token-amount-form">
                <label  className="token-input-label">Token Approval :</label>
                <input type="text" ref={approvedTokenRef}></input>
                <Button onClick={approveToken} type="submit"  label="Token Approve"></Button>

            </form>
        </div>
    )

}
export default TokenApproval