import commonSwapsTreasuryContract from '../contracts/commonSwaps/commonSwapsTreasuryContract'

export const getWETHBalanceInTreasury = async() => {
    try {
        const amountOut = await commonSwapsTreasuryContract.methods.WETHAmount().call();
        console.log("WETH Balance in contract: ", amountOut[amountOut.length - 1]);
        return amountOut[amountOut.length - 1]
    } catch (error) {
        console.error("Error calling contract method:", error);
    }
}