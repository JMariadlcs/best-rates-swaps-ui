import web3 from '../web3';

import uniswapV2Router02ABI from './abis/uniswapV2Router02ABI.json';

const uniswapV2Router02Address = "" // Arbitrum Network

const uniswapV2Router02Contract = new web3.eth.Contract(uniswapV2Router02ABI as any, uniswapV2Router02Address)
export default uniswapV2Router02Contract
