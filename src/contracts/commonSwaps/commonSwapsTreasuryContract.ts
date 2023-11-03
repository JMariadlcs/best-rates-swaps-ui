import web3 from '../web3';

import commonSwapsTreasuryABI from './abis/commonSwapsTreasuryABI.json';

const commonSwapsTreasuryAddress = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" // Arbitrum Network

const commonSwapsTreasuryContract = new web3.eth.Contract(commonSwapsTreasuryABI as any, commonSwapsTreasuryAddress)
export default commonSwapsTreasuryContract