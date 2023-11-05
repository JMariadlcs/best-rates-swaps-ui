import web3 from '../web3';

import commonSwapsTreasuryABI from './abis/commonSwapsTreasuryABI.json';
import { commonSwapsTreasuryAddress } from '../addresses/contractAddresses'

const commonSwapsTreasuryContract = new web3.eth.Contract(commonSwapsTreasuryABI as any, commonSwapsTreasuryAddress)
export default commonSwapsTreasuryContract
