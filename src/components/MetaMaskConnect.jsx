import React from "react";
import Web3 from "web3";
import '../styles/metamaskConnect.css';

export const NETWORKS = {
    arbitrum: {
        chainId: "0xa4b1",
        chainName: "Arbitrum",
        nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.ankr.com/arbitrum"], // Arbitrum RPC URL
        blockExplorerUrls: ["https://arbiscan.io/"], // Arbitrum Block Explorer URL
    },
}

const MetaMaskConnect = ({ setUserWalletInfo, setWeb3Provider, setTxSigner }) => {
    const buttonHandler = async () => {
        if (window.ethereum) {

            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId !== 137) {
                await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [NETWORKS.arbitrum], });
            }
            try {
                const web3 = new Web3(window.ethereum);
                await web3.eth.getAccounts()
                    .then(accounts => { 
                        console.log("Acc", accounts[0])
                        accountChangeHandler(accounts[0])
                        setTxSigner(accounts[0])
                    })
            } catch (error) {
                console.error(error);
            }
        }
    };

    const accountChangeHandler = async (address) => {
        try {
            const web3 = new Web3(window.ethereum);
            const balance = await web3.eth.getBalance(address);
            setUserWalletInfo({
                address: address,
                balance: web3.utils.fromWei(balance, 'ether'),
            });
            setWeb3Provider(web3);
            await web3.eth.getAccounts()
                    .then(accounts => { 
                        console.log("Acc", accounts[0])
                        
                        setTxSigner(accounts[0])
                    })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="buy-btns-container">
            <button onClick={buttonHandler} className="connect-wallet">
                <p>Connect Wallet</p>
            </button>
        </div>
    );
};

export default MetaMaskConnect;