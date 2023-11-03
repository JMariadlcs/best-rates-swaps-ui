

import { getSushiSwapPrice } from '../commonSwaps/sushiswap/sushiswapHelper'
import { getCamelotV2SwapPrice } from '../commonSwaps/camelotV2/camelotV2Helper';

const CommonSwaps = () => {
    let sushiSwapAmountOut, camelotSwapAmountOut

    
    const getSwapRate = async() => {

        const token1 = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'; // WETH (Arbitrum)
        const token2 = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'; // USDT (Arbitrum)
        const amount = 1000000000000;
    
        sushiSwapAmountOut = await getSushiSwapPrice(token1, token2, amount);
        camelotSwapAmountOut = await getCamelotV2SwapPrice(token1, token2, amount);
      }



  return (
    <div className="CommonSwaps">
        <div className="swapBody">
        <button onClick={getSwapRate}>Get new swap rates</button>
        <p>SushiSwap rate amount: {sushiSwapAmountOut}</p>
        <p>CamelotSwapAmountOut rate amount: {camelotSwapAmountOut}</p>
        </div>
   
    </div>
  );
};

export default CommonSwaps;
