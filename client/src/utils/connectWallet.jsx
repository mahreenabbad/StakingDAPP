import {ethers,Contract} from 'ethers'
import stakeTokenAbi from '../ABI/stakeTokenAbi.json'
import stakingAbi from '../ABI/stakingAbi.json'


export const connectWallet=async()=>{
    try {
        let [signer,provider, stakingContract, stakeTokenContract,chainId]=[null]
        if(window.ethereum===null){
            throw new Error("Metamask is not installed")
        }
        const accounts = await window.ethereum.request({
            method:'eth_requestAccounts'
        })
        let chainIdHex= await window.ethereum.request({
            method:'eth_chainId'
        })
        chainId = parseInt(chainIdHex,10)
        let selectedAccount =accounts[0]
        if(!selectedAccount){
            throw new Error("No ethereum account available")
        }
        provider = new ethers.BrowserProvider(window.ethereum);
        signer= await provider.getSigner();
        const stakingContractAddress ="0xB15ebb76b39128016525e79202D1090D06b32314";
        const stakeTokenContractAddress ="0x3cc8421a99d9a6375145480fc796E4324cd1DB66";

        stakingContract = new Contract(stakingContractAddress,stakingAbi,signer)
        stakeTokenContract = new Contract(stakeTokenContractAddress,stakeTokenAbi,signer)
        return {provider,selectedAccount,stakeTokenContract,stakingContract,chainId}

    } catch (error) {
        console.error(error)
        throw error
        
    }
}