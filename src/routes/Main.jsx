import logo from '../logo.svg';
import "../App.css";

import * as paraSwapApi from '../paraswap/helpers/paraSwapApi'
import { createSwapper, getSwapTransaction } from '../paraswap/helpers/paraSwapApi'

import { getSushiSwapPrice } from '../commonSwaps/sushiswap/sushiswapHelper'

const Main = () => {

  /*const getRate = async () => {
    const swapper = paraSwapApi.createSwapper(137, paraSwapApi.API_URL)
    const rate = await swapper.getRate({ srcToken: paraSwapApi.getToken('USDT', 137), destToken: paraSwapApi.getToken('USDT', 137), srcAmount: 10000, partner: "chucknorris" })
    console.log("getRate", rate)
  }*/

  const getFullTx = async () => {
   const fullTx = await getSwapTransaction({ srcToken: 'MATIC', destToken: 'USDT', srcAmount: 0.01, networkID: 137, userAddress: paraSwapApi.USER_ADDRESS, onlyParams: true})
   console.log("FullTx", fullTx)
  }

  getFullTx()

  getSushiSwapPrice('0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', 1000000000000)

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

export default Main;
