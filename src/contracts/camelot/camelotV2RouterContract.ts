import web3 from '../web3';

import camelotV2RouterABI from './abis/camelotRouter.json';

const camelotV2RouterAddress = "0xc873fEcbd354f5A56E00E710B90EF4201db2448d" // Camelot Router - Arbitrum Network

const camelotV2RouterContract = new web3.eth.Contract(camelotV2RouterABI as any, camelotV2RouterAddress)
export default camelotV2RouterContract
