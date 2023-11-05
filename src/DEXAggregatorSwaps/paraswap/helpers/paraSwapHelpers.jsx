import axios from 'axios'
import Web3 from 'web3';

const ParawapV5URL = 'https://apiv5.paraswap.io'
export async function getPrices(srcToken, srcDecimals, destToken, destDecimals, amount, side, network, includeDEXS) {
    console.log("PARAMS", srcToken, srcDecimals, destToken, destDecimals, amount, side, network)
    try {
        const result = await axios.get(`${ParawapV5URL}/prices?srcToken=${srcToken}&srcDecimals=${srcDecimals}&destToken=${destToken}&destDecimals=${destDecimals}&amount=${amount}&side=${side}&network=${network}&includeDEXS=${includeDEXS}`);
        return result.data.priceRoute;
    } catch (e) {
        console.error(e);
        return null;
    }

}

export async function getTransactionData(network, priceRoute, userAddress) {
    try {
        const result = await axios.post(
            `${ParawapV5URL}/transactions/${network}?ignoreChecks=true`,
            {
                'srcToken': priceRoute.srcToken,
                'srcDecimals': priceRoute.srcDecimals,
                'destToken': priceRoute.destToken,
                'destDecimals': priceRoute.destDecimals,
                'srcAmount': priceRoute.srcAmount,
                'priceRoute': priceRoute,
                'slippage': 100,
                'userAddress': userAddress,
            }
        );
        return result.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function performTransaction(txData) {
    try {
        const web3 = new Web3(window.ethereum)
        const tx = await web3.eth.sendTransaction(txData)
        return tx
    } catch (e) {
        console.error(e)
        return null
    }
}