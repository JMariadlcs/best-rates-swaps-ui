import { useState } from "react";
import web3 from "../contracts/web3";
import MetaMaskConnect from "./MetaMaskConnect";
import WETHAbi from '../contracts/abis/WETHABI.json'
import { WETHAddress, USDTAddress, commonSwapsTreasuryAddress } from "../contracts/addresses/contractAddresses";
import commonSwapsTreasuryABI from '../contracts/commonSwaps/abis/commonSwapsTreasuryABI.json'
import { getUSDTBalanceInTreasury, getWETHBalanceInTreasury } from '../commonSwaps/TreasuryHelpers'

const DepositCommonSwaps = ( {bestProvider}) => {

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

    const approveCommonSwaps = async () => {
        try {
            const tokenContract = new web3Provider.eth.Contract(WETHAbi, WETHAddress, { from: txSigner })
            const approvalTx = tokenContract.methods.approve(commonSwapsTreasuryAddress, "100000000")

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
            const depositTx = commonSwapsTreasuryContract.methods.depositWETH('100000000000000')

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
            const selectRouter = 1
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
            !userWalletInfo.address && <p className="textdiv"> STEP 2: CONNECT METAMASK </p>
        } {

                !userWalletInfo.address && <MetaMaskConnect
                    setUserWalletInfo={setUserWalletInfo}
                    setWeb3Provider={setWeb3Provider}
                    setTxSigner={setTxSigner}
                />
            }
            {
                userWalletInfo.address &&
                (<>
                    <p className="textdiv"> STEP 3: APPROVE WETH </p>
                    <button className="ApproveCommonSwaps" onClick={approveCommonSwaps}> Approve WETH</button>
                    <p className="textdiv"> STEP 4: DEPOSIT WETH </p>
                    <button className="depositCommonSwaps" onClick={depositWETH}> Deposit WETH</button>
                    
                </>)
            }
            {
                userWalletInfo.address &&
                (<>
                    <p className="textdiv"> STEP 5: SWAP WETH TO USDT </p>
                    <button className="reloadTreasuryBalances" onClick={swapWETHtoUSDT}> Swap whole WETH balance to USDT</button>
                    <p className="textdiv"> Provider with better rate chosen for swapping: {bestProvider} </p>
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
                    <button className="reloadTreasuryBalances" onClick={getTreasuryBalances}> Update treasury balances</button>
                </>)
            }
            {
                WETHAmount && <div>WETH Balance in Treasury: {WETHAmount}</div>
            }
            {
                USDTAmount && <div>USDT Balance in Treasury: {USDTAmount}</div>
            }
        </>
    )
}

export default DepositCommonSwaps