import { createSwapper, getSwapTransaction } from '../DEXAggregatorSwaps/paraswap/helpers/paraSwapApi'
import * as paraSwapApi from '../DEXAggregatorSwaps/paraswap/helpers/paraSwapApi'

const DEXAggregatorSwaps = () => {
    const buildTx = async () => {
        const fullTx = await getSwapTransaction({ srcToken: 'WETH', destToken: 'USDT', srcAmount: 0.01, networkID: 42161, userAddress: paraSwapApi.USER_ADDRESS, onlyParams: true })
        console.log("FullTx", fullTx)
      }
return (
    <div className="App">
      <header className="App-header">
        <section className='welcome-section'>
          <h1 className='become-title'>Welcome to Best-Swaps-Rates</h1>
          <button className="access-button" onClick={buildTx}>BuildTx</button>
        </section>
      </header>
    </div>
)
}

export default DEXAggregatorSwaps