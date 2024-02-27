
import {useState,useContext,useRef} from "react"
import {ethers} from "ethers";
import Button from "../Button/Button";
import Web3Context from "../../context/Web3Context";
import "./ClaimReward.css"
const ClaimReward=()=>{

    const {stakingContract} =useContext(Web3Context);
    const withdrawStakeAmountRef =useRef();
    const [transactionStatus,setTransactionStatus] =useState("")

    const claimReward=async(e)=>{
     
     try {
        const transaction = await stakingContract.getReward()
        await toast.promise(transaction.wait(),
        {
          loading: "Transaction is pending...",
          success: 'Transaction successful 👌',
          error: 'Transaction failed 🤯'
        });
        withdrawStakeAmountRef.current.value = "";
        setTransactionStatus("Staking Successfull")
     } catch (error) {
        console.error("Claim reward Failed", error.message)
     }
    }
    return(<>
          <>
    <div className="claim-reward">
     <Button type="button" label="Claim Reward" onClick={claimReward}/>
     </div>
    </>
        </>
    )
}
export default ClaimReward