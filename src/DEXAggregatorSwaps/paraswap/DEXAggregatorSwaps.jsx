import { useState } from 'react';
import MetaMaskConnect from '../../components/MetaMaskConnect';
import { DEXAggregatorAddress, WETHAddress, USDTAddress } from '../../contracts/addresses/contractAddresses'
import WETHAbi from '../../contracts/abis/WETHABI.json'
import { getPrices, getTransactionData, performTransaction } from './helpers/paraSwapHelpers'

const DEXAggregatorSwaps = () => {
    const [userWalletInfo, setUserWalletInfo] = useState({ address: undefined, balance: undefined });
    const [web3Provider, setWeb3Provider] = useState(undefined);
    const [txSigner, setTxSigner] = useState(undefined)
    const [approvalState, setApprovalState] = useState({
        done: false,
        loading: false,
        error: false,
    });
    const [amount, setAmount] = useState('')

    const handleDepositAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const approveDEXAggregator = async () => {
        try {
            const tokenContract = new web3Provider.eth.Contract(WETHAbi, WETHAddress, { from: txSigner })
            const approvalTx = tokenContract.methods.approve(DEXAggregatorAddress, amount)

            await approvalTx.send({ from: txSigner })
                .on('transactionHash', () => {
                    setApprovalState({ ...approvalState, loading: true })
                })
                .on('receipt', () => {
                    setApprovalState({ done: true, loading: false, error: false })
                })
                .on('error', (error) => {
                    console.log(`%c${error.message}`, "color: red; background: black; font-size: 20px")
                    setApprovalState({ ...approvalState, error: true });
                })
        } catch (error) {
            console.error(error)
            setApprovalState({ ...approvalState, error: true })
        }
    };

    const buildTx = async () => {
        const srcToken = 'WETH'
        const srcDecimals = 18
        const destToken = 'USDT'
        const destDecimals = 6
        const srcAmount = amount
        const side = 'SELL'
        const networkID = '42161'
        const includeDEXS = ['Curve', 'UniswapV2', 'UniswapV3', 'SushiSwap']

        const routePrices = await getPrices(srcToken, srcDecimals, destToken, destDecimals, srcAmount, side, networkID, includeDEXS)
        let txData = await getTransactionData(networkID, routePrices, userWalletInfo.address)
        const tx = await performTransaction(txData)
    }

    return (
        <section className='welcome-section'>
            <p>The operation of the DEX Aggregators section is as follows: Any user can directly swap WETH tokens to USDT from their wallet. The optimal route for token swaps is computed in real time, choosing among UniswapV2, UniswapV3, SushiSwap, and Curve protocols to provide the best rate available.</p>
            <div className="main-container">
            {
                !userWalletInfo.address && <p className="textdiv"> STEP 1: CONNECT METAMASK </p>
            } {

                !userWalletInfo.address && <MetaMaskConnect
                    setUserWalletInfo={setUserWalletInfo}
                    setWeb3Provider={setWeb3Provider}
                    setTxSigner={setTxSigner}
                />
            }
            {
                userWalletInfo.address && <p className="textdiv"> STEP 2: INPUT WETH AMOUNT FOR SWAPPING (Amount in WEI) </p>

            }
            {userWalletInfo.address &&
                <input
                    type="number"
                    id="amountInput"
                    placeholder="Deposit WETH amount in WEI"
                    value={amount}
                    onChange={handleDepositAmountChange}
                />
            }
            {<>
                {userWalletInfo.address && <p className="textdiv"> STEP 3: APPROVE </p>}
                {userWalletInfo.address && <button className="access-button" onClick={approveDEXAggregator}>Approve amount</button>}
            </>
            }
            {<>
                {userWalletInfo.address &&<p className="textdiv"> STEP 4: SWAP </p>}
                {userWalletInfo.address && <button className="access-button" onClick={buildTx}>SWAP</button>}
            </>}
            </div>
        </section>
    )
}

export default DEXAggregatorSwaps