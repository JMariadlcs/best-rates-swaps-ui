import web3 from '../web3';

import sushiswapV2Router02ABI from './abis/sushiswapV2Router02ABI.json';

const sushiSwapV2Router02Address = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" // Arbitrum Network

const sushiswapV2Router02Contract = new web3.eth.Contract(sushiswapV2Router02ABI as any, sushiSwapV2Router02Address)
export default sushiswapV2Router02Contract
