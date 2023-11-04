import { useState } from "react";
import web3 from "../contracts/web3";
import MetaMaskConnect from "./MetaMaskConnect";
import WETHAbi from '../contracts/abis/WETHABI.json'
import { WETHAddress, commonSwapsTreasuryAddress } from "../contracts/addresses/contractAddresses";

const DepositCommonSwaps = () => {

    const [userWalletInfo, setUserWalletInfo] = useState({ address: undefined, balance: undefined });
    const [web3Provider, setWeb3Provider] = useState(undefined);
    const [txSigner, setTxSigner] = useState(undefined)
    const [approvalState, setApprovalState] = useState({
        done: false,
        loading: false,
        error: false,
    });

    const approveCommonSwaps = async () => {
        try {
            console.log("web3Provider", web3Provider, txSigner);
            const tokenContract = new web3Provider.eth.Contract(WETHAbi, WETHAddress, { from: txSigner }); // WETH
            const approvalTx = tokenContract.methods.approve(commonSwapsTreasuryAddress, "100000000");
    
            await approvalTx.send({ from: txSigner })
            .on('transactionHash', () => {
                // Handle the transaction hash event, e.g., update loading state.
                setApprovalState({ ...approvalState, loading: true });
            })
            .on('receipt', () => {
                // Handle the receipt event, e.g., update done state.
                setApprovalState({ done: true, loading: false, error: false });
            })
            .on('error', (error) => {
                // Handle any errors, e.g., update error state.
                console.log(`%c${error.message}`, "color: red; background: black; font-size: 20px");
                setApprovalState({ ...approvalState, error: true });
            });
        } catch (error) {
            console.error(error);
            setApprovalState({ ...approvalState, error: true });
        }
    };


    const depositWETH = () => {

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

        </>
    )
}

export default DepositCommonSwaps