import { useState } from "react";
import MetaMaskConnect from "./MetaMaskConnect";
import WETHAbi from '../contracts/abis/WETHABI.json'
import { WETHAddress, USDTAddress, commonSwapsTreasuryAddress } from "../contracts/addresses/contractAddresses";
import commonSwapsTreasuryABI from '../contracts/commonSwaps/abis/commonSwapsTreasuryABI.json'
import { getUSDTBalanceInTreasury, getWETHBalanceInTreasury } from '../commonSwaps/TreasuryHelpers'
import { getSushiSwapPrice } from '../commonSwaps/sushiswap/sushiswapHelper'
import { getCamelotV2SwapPrice } from '../commonSwaps/camelotV2/camelotV2Helper'

const DepositCommonSwaps = () => {

    const [sushiRate, setSushiRate] = useState(undefined)
    const [camelotRate, setCamelotRate] = useState(undefined)
    const [bestRateProvider, setBestRateProvider] = useState(undefined)
    const [userWalletInfo, setUserWalletInfo] = useState({ address: undefined, balance: undefined });
    const [web3Provider, setWeb3Provider] = useState(undefined);
    const [txSigner, setTxSigner] = useState(undefined)
    const [approvalState, setApprovalState] = useState({
        done: false,
        loading: false,
        error: false,
    });
    const [WETHAmount, setWETHAmount] = useState(undefined)
    const [USDTAmount, setUSDTAmount] = useState(undefined)
    const [amount, setAmount] = useState('')
    const [needToloadRate, setNeedToLoadRate] = useState(true)
    const handleDepositAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const getSwapRate = async () => {
        let sushiSwapAmountOut, camelotSwapAmountOut
        const token1 = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'; // WETH (Arbitrum)
        const token2 = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'; // USDT (Arbitrum)
        const amount = 1000000000000;

        sushiSwapAmountOut = await getSushiSwapPrice(token1, token2, amount);
        setSushiRate(sushiSwapAmountOut)
        camelotSwapAmountOut = await getCamelotV2SwapPrice(token1, token2, amount);
        setCamelotRate(camelotSwapAmountOut)
        if (sushiSwapAmountOut >= camelotSwapAmountOut) setBestRateProvider('SushiSwap')
        else setBestRateProvider('Camelot')
        setNeedToLoadRate(false)
    }

    const approveCommonSwaps = async () => {
        try {
            const tokenContract = new web3Provider.eth.Contract(WETHAbi, WETHAddress, { from: txSigner })
            const approvalTx = tokenContract.methods.approve(commonSwapsTreasuryAddress, amount)

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


    const depositWETH = async () => {
        try {
            const commonSwapsTreasuryContract = new web3Provider.eth.Contract(commonSwapsTreasuryABI, commonSwapsTreasuryAddress, { from: txSigner })
            const depositTx = commonSwapsTreasuryContract.methods.depositWETH(amount)

            await depositTx.send({ from: txSigner })
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
    }

    const swapWETHtoUSDT = async () => {
        try {
            const commonSwapsTreasuryContract = new web3Provider.eth.Contract(commonSwapsTreasuryABI, commonSwapsTreasuryAddress, { from: txSigner })
            const WETHBalanceInTreasury = await getWETHBalanceInTreasury()
            const path = [WETHAddress, USDTAddress]
            const swapAmount = WETHBalanceInTreasury
            const selectRouter = bestRateProvider === 'Sushiswap' ? 0 : 1
            const minAmountOut = 0
            const deadline = Date.now()
            const swapTx = await commonSwapsTreasuryContract.methods.swapWETHforUSDT(path, swapAmount.toString(), selectRouter.toString(), minAmountOut.toString(), deadline.toString())

            await swapTx.send({ from: txSigner })
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
    }

    const withdrawUSDT = async () => {
        try {
            const commonSwapsTreasuryContract = new web3Provider.eth.Contract(commonSwapsTreasuryABI, commonSwapsTreasuryAddress, { from: txSigner })
            const swapTx = await commonSwapsTreasuryContract.methods.withdrawAllUSDT()

            await swapTx.send({ from: txSigner })
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
    }

    const getTreasuryBalances = async () => {
        const WETHBalanceInTreasury = await getWETHBalanceInTreasury()
        const USDTBalanceInTreasury = await getUSDTBalanceInTreasury()
        setWETHAmount(WETHBalanceInTreasury)
        setUSDTAmount(USDTBalanceInTreasury)
    }

    return (
        <> {
            !userWalletInfo.address && <p className="textdiv"> STEP 1: CONNECT METAMASK </p>
        } {

                !userWalletInfo.address && <MetaMaskConnect
                    setUserWalletInfo={setUserWalletInfo}
                    setWeb3Provider={setWeb3Provider}
                    setTxSigner={setTxSigner}
                />
            }
            {
                userWalletInfo.address && <div className='swap-rates-block'>
                    <div className="textdiv"> STEP 2: GET SWAP RATES</div>
                    <button onClick={getSwapRate}>Get new swap rates</button>
                    {
                        sushiRate && <p className="textdiv">SushiSwap WETH-USDT output: {sushiRate}</p>
                    }
                    {
                        camelotRate && <p className="textdiv">Camelot WETH-USDT output: {camelotRate}</p>
                    }
                </div>
            }

            { !needToloadRate && <div clasName="postrate-div">
            {
                userWalletInfo.address &&
                (<>
                    <p className="textdiv"> STEP 3: APPROVE WETH </p>
                    <input
                        className="inputContainer"
                        type="number"
                        id="amountInput"
                        placeholder="WETH amount in WEI"
                        value={amount}
                        onChange={handleDepositAmountChange}
                    />
                    <button className="ApproveCommonSwaps" onClick={approveCommonSwaps}> Approve WETH</button>
                    <p className="textdiv"> STEP 4: DEPOSIT WETH </p>
                    <button className="depositCommonSwaps" onClick={depositWETH}> Deposit WETH</button>
                </>)
            }
            {
                userWalletInfo.address &&
                (<>
                    <p className="textdiv"> STEP 5: SWAP WETH TO USDT </p>
                    {
                        needToloadRate && <p className="needToLoadRate"> Please click the button in STEP 2 for getting new swap rates: {bestRateProvider} </p>
                    }
                    {!bestRateProvider && <button className="reloadTreasuryBalances0" disabled={!bestRateProvider} onClick={swapWETHtoUSDT}> Swap whole WETH balance to USDT</button>}
                    {bestRateProvider && <button className="reloadTreasuryBalances" disabled={!bestRateProvider} onClick={swapWETHtoUSDT}> Swap whole WETH balance to USDT</button>}
                    <p className="textdiv"> Provider with better rate chosen for swapping: {bestRateProvider} </p>
                </>)
            }
            {
                userWalletInfo.address &&
                (<>
                    <p className="textdiv"> STEP 6: WITHDRAW ALL USDT </p>
                    <button className="withdrawUSDT" onClick={withdrawUSDT}> Withdraw whole USDT balance</button>
                </>)
            }
            {
                userWalletInfo.address &&
                (<>
                    <p className="textdiv"> OPTINAL: CHECK TREASURY BALANCES </p>
                    <button className="reloadTreasuryBalances" onClick={getTreasuryBalances}> Update treasury balances</button>
                </>)
            }
            {
                WETHAmount && <div>WETH Balance in Treasury: {WETHAmount}</div>
            }
            {
                USDTAmount && <div>USDT Balance in Treasury: {USDTAmount}</div>
            }
            </div>}
        </>
    )
}

export default DepositCommonSwaps