import Web3 from 'web3'

import sushiswapV2Router02ABI from './abis/sushiswapV2Router02ABI'

const sushiSwapV2Router02Address = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" // Arbitrum Network
const web3 = new Web3('https://arb1.arbitrum.io/rpc')

export const sushiswapV2Router02Contract = new web3.eth.Contract(sushiswapV2Router02ABI, sushiSwapV2Router02Address)

