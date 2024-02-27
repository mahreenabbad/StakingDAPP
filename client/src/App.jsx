import { useState } from 'react'
import  Wallet  from '../src/components/Wallet/Wallet.jsx'
import Navigation from './components/Navigation/Navigation.jsx'
import DisplayPannel from './components/Display Pannel/DisplayPannel.jsx'
import TokenApproval from './components/StakeToken/TokenApproval.jsx'
import StakeAmount from './components/StakeToken/StakeAmount.jsx'
import Withdraw from './components/Withdraw/Withdraw.jsx'
import { StakingProvider } from './context/StakingContext.jsx'
import './App.css'
function App() {
  const [displaySection, setDisplaySection] = useState("stake");

  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };

  return (
    <div className='main-section'>
    <Wallet>
      <Navigation/>
      <StakingProvider>
          <DisplayPannel/>
          <div className='main-content'>
            <div className='button-section'>
              <button onClick={()=> handleButtonClick("stake")}
              className={displaySection === "stake" ? "" : "active"}>
                   Stake
              </button>
              <button
                onClick={() => handleButtonClick("withdraw")}
                className={displaySection === "withdraw" ? "" : "active"}
              >
                Withdraw
              </button>
            </div>
            {displaySection === "stake" &&(
              <div className='stake-wrapper'>
                <TokenApproval/>
                <StakeAmount/> 
              </div>
            )}
            {displaySection === "withdraw" && (
              <div className='stake-wrapper'>
                <Withdraw/>
              </div>
            )}
          </div>
     </StakingProvider> 
    </Wallet>
    </div>
  )
}

export default App
