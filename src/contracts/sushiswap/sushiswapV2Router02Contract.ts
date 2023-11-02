import { ethers } from "ethers";
import sushiswapV2Router02ABI from './abis/sushiswapV2Router02ABI'

const sushiSwapV2Router02Address = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" // Arbitrum Network

export const sushiswapV2Router02Contract = new ethers.Contract(sushiSwapV2Router02Address, sushiswapV2Router02ABI);

