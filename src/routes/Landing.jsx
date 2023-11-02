import logo from '../logo.svg';
import "../App.css";

import * as paraSwapApi from '../paraswap/helpers/paraSwapApi'
import { createSwapper, getSwapTransaction } from '../paraswap/helpers/paraSwapApi'


const Landing = () => {

  /*const getRate = async () => {
    const swapper = paraSwapApi.createSwapper(137, paraSwapApi.API_URL)
    const rate = await swapper.getRate({ srcToken: paraSwapApi.getToken('USDT', 137), destToken: paraSwapApi.getToken('USDT', 137), srcAmount: 10000, partner: "chucknorris" })
    console.log("getRate", rate)
  }*/

  const getFullTx = async () => {
   const fullTx = await getSwapTransaction({ srcToken: 'MATIC', destToken: 'USDT', srcAmount: 0.01, networkID: 137, userAddress:  paraSwapApi.USER_ADDRESS})
   console.log("FullTx", fullTx)
  }

  getFullTx()



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Landing;
