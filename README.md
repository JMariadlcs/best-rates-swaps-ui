# BEST RATES SWAPS

Welcome to Best Swaps Rates. Within this application, you will have the opportunity to perform WETH-USDT swaps across various decentralized exchanges (DEXs) while selecting the most favorable exchange rate available.

- Deployed website: [Best-Rates-Swaps](https://best-rates-swaps-ui.vercel.app/).
- Smart Contracts repository: [Repository](https://github.com/JMariadlcs/best-rate-swaps).
- Smart Contract address: [Treasury.sol](0x997d3168776d9AF7A60d3664E1e69704e72F38b0).

# Functionalities

The primary functionality of this project involves the exchange of assets from Wrapped Ether (WETH) to Tether (USDT) through various decentralized exchanges, with the objective of obtaining the most favorable exchange rate available among them.

To achieve the desired goal, two methods of swapping assets have been implemented. These two methods are utilized to demonstrate how a similar goal can be attained through two distinct procedures. These methods have been called:

1. CommonSwaps.
2. DEXAggregatorSwaps.

## CommonSwaps
The common swaps method combines both an on-chain and off-chain structure. The best rate is previously calculated off-chain using the router view functions of each decentralized exchange. Once we have determined the best rate offered by an exchange, the on-chain swap occurs within our Treasury smart contract, selecting the decentralized exchange with the previously calculated best rate. Computing the best rate "off-chain" makes it more challenging for malicious actors, such as MEV bots, to engage in front-running or sandwich attacks.

The implemented Treasury smart contract can be found at the following link: [here](https://github.com/JMariadlcs/best-rate-swaps). This repository encompasses all aspects related to the smart contracts utilized in this project, including the contract itself, deployment scripts, and testing scripts.

- Smart Contract address: [Treasury.sol](0x997d3168776d9AF7A60d3664E1e69704e72F38b0).

This contract works in the following way:
1. Any user has the option to deposit WETH tokens, and these tokens are pooled together within the contract without individual tracking for each user.
2. Any user can access the platform and initiate a swap for the entire WETH balance held within the contract. The swap is facilitated through the exchange that provides the most favorable rate, as indicated by our frontend interface.
3. Any user can withdraw the USDT amount of tokens held in the Treasury.
4. There is a button available for users to retrieve the WETH and USDT token balances of the Treasury contract at any given moment.