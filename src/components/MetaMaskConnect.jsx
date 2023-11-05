import React, { useEffect, useState } from "react";
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
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);

    const connectToMetaMask = async () => {
        try {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(window.ethereum);

                // Get the user's Ethereum accounts
                const accounts = await web3.eth.getAccounts();

                if (accounts.length > 0) {
                    // Successful connection, set the user's account
                    const address = accounts[0];

                    // Fetch the balance
                    const balance = await web3.eth.getBalance(address);

                    setUserWalletInfo({
                        address,
                        balance: web3.utils.fromWei(balance, 'ether'),
                    });

                    setWeb3Provider(web3);
                    setTxSigner(address);
                } else {
                    setError("No Ethereum accounts available.");
                }
            } else {
                setError("MetaMask not detected. Please install and configure MetaMask.");
            }
        } catch (error) {
            setError(error.message || "An error occurred while connecting to MetaMask.");
        }
    };

    useEffect(() => {
        // Attempt to connect to MetaMask when the component mounts
        connectToMetaMask();
    }, []);

    return (
        <div className="buy-btns-container">
            <button onClick={connectToMetaMask} className="connect-wallet">
                <p>Connect Wallet</p>
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default MetaMaskConnect;