import { createSwapper, getSwapTransaction } from './helpers/paraSwapApi'
import * as paraSwapApi from './helpers/paraSwapApi'
import { useState } from 'react';
import MetaMaskConnect from '../../components/MetaMaskConnect';
import { DEXAggregatorAddress, WETHAddress, USDTAddress } from '../../contracts/addresses/contractAddresses'
import WETHAbi from '../../contracts/abis/WETHABI.json'
import { getPrices, getTransactionData, performTransaction}  from './helpers/paraSwapHelpers'

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
        const srcAmount  = amount
        const side = 'SELL'
        const networkID = '42161'
        const includeDEXS = ['Curve', 'UniswapV2', 'UniswapV3', 'SushiSwap']

        // const userAddress = userWalletInfo.address
        // const onlyParams = true
        // const includeDEXS = ['Curve', 'UniswapV2', 'UniswapV3', 'SushiSwap']
        // const excludeContractMethods = ['directUniV3Swap', 'directUniV3Swap', 'directCurveV1Swap', 'directCurveV2Swap', 'directBalancerV2GivenInSwap']
        const routePrices = await getPrices(srcToken, srcDecimals, destToken, destDecimals, srcAmount, side, networkID, includeDEXS)
        let txData = await getTransactionData(networkID, routePrices, userWalletInfo.address)
        const tx = await performTransaction(txSigner, txData)
        console.log("txtxtx", tx)
        // const fullTx = await getSwapTransaction({ srcToken: 'WETH', destToken: 'USDT', srcAmount: 0.00001, networkID: 42161, userAddress: userWalletInfo.address, onlyParams: true, includeDEXS: ['Curve', 'UniswapV2', 'UniswapV3', 'SushiSwap'], excludeContractMethods: ['directUniV3Swap', 'directUniV3Swap', 'directCurveV1Swap', 'directCurveV2Swap', 'directBalancerV2GivenInSwap'] })
       // console.log("routePrices", routePrices)
    }

    return (
        <section className='welcome-section'>
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
                userWalletInfo.address && <button className="access-button" onClick={approveDEXAggregator}>Approve amount</button>
            }
            {
                userWalletInfo.address && <button className="access-button" onClick={buildTx}>BuildTx</button>
            }
            { userWalletInfo.address &&
                <input
                type="number"
                id="amountInput"
                placeholder="Deposit WETH amount in WEI"
                value={amount}
                onChange={handleDepositAmountChange}
            />
            }
        </section>
    )
}

export default DEXAggregatorSwaps