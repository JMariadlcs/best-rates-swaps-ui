

import { useState } from 'react';
import { getSushiSwapPrice } from '../commonSwaps/sushiswap/sushiswapHelper'
import { getCamelotV2SwapPrice } from '../commonSwaps/camelotV2/camelotV2Helper';
import MetaMaskConnect from '../components/MetaMaskConnect';

import '../styles/commonSwaps.css'

const CommonSwaps = () => {

    const [sushiRate, setSushiRate] = useState(undefined)
    const [camelotRate, setCamelotRate] = useState(undefined)

    const getSwapRate = async () => {
        let sushiSwapAmountOut, camelotSwapAmountOut
        const token1 = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'; // WETH (Arbitrum)
        const token2 = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'; // USDT (Arbitrum)
        const amount = 1000000000000;

        sushiSwapAmountOut = await getSushiSwapPrice(token1, token2, amount);
        setSushiRate(sushiSwapAmountOut)
        camelotSwapAmountOut = await getCamelotV2SwapPrice(token1, token2, amount);
        setCamelotRate(camelotSwapAmountOut)
    }



    return (
        <div className="commonSwaps-page">
        <MetaMaskConnect></MetaMaskConnect>
        <div className="CommonSwaps">
            <header className="commonSwaps-header">
                <section className='commonSwaps-section'>
                    <h1 className='become-title'>Welcome to Best-Swaps-Rates</h1>
                    <button onClick={getSwapRate}>Get new swap rates</button>
                    <p>SushiSwap rate amount: {sushiRate}</p>
                    <p>CamelotSwapAmountOut rate amount: {camelotRate}</p>

                </section>
            </header>
        </div>
        </div>
    );
};

export default CommonSwaps;
