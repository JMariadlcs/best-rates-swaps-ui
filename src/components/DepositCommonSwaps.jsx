import { useState } from "react";
import web3 from "../contracts/web3";
import MetaMaskConnect from "./MetaMaskConnect";
import WETHAbi from '../contracts/abis/WETHABI.json'
import { WETHAddress, commonSwapsTreasuryAddress } from "../contracts/addresses/contractAddresses";
import commonSwapsTreasuryABI from '../contracts/commonSwaps/abis/commonSwapsTreasuryABI.json'
import { getUSDTBalanceInTreasury, getWETHBalanceInTreasury } from '../commonSwaps/TreasuryHelpers'

const DepositCommonSwaps = () => {

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
            const depositTx = commonSwapsTreasuryContract.methods.depositWETH('1')

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

    const getTreasuryBalances = async () => {
        const WETHBalanceInTreasury = await getWETHBalanceInTreasury()
        const USDTBalanceInTreasury = await getUSDTBalanceInTreasury()
        setWETHAmount(WETHBalanceInTreasury)
        setUSDTAmount(USDTBalanceInTreasury)
    }


    return (
        <> {
            !userWalletInfo.address && <MetaMaskConnect
                setUserWalletInfo={setUserWalletInfo}
                setWeb3Provider={setWeb3Provider}
                setTxSigner={setTxSigner}
            />
        }
            {
                userWalletInfo.address &&
                (<>
                    <button className="ApproveCommonSwaps" onClick={approveCommonSwaps}> Approve WETH</button>
                    <button className="depositCommonSwaps" onClick={depositWETH}> Deposit WETH</button>
                </>)
            }
            {
                userWalletInfo.address &&
                (<>
                    <button className="reloadTreasuryBalances" onClick={getTreasuryBalances}> Reload Treasury Balances:</button>
                </>)
            }
<div>{WETHAmount}</div>
<div>{USDTAmount}</div>
        </>
    )
}

export default DepositCommonSwaps