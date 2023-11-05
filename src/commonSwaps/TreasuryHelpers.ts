import commonSwapsTreasuryContract from '../contracts/commonSwaps/commonSwapsTreasuryContract'

export const getWETHBalanceInTreasury = async() => {
    try {
        const amountOut = await commonSwapsTreasuryContract.methods.WETHAmount().call();
        console.log("WETH Balance in contract: ", amountOut);
        return amountOut
    } catch (error) {
        console.error("Error calling contract method:", error);
    }
}

export const getUSDTBalanceInTreasury = async() => {
    try {
        const amountOut = await commonSwapsTreasuryContract.methods.USDTAmount().call();
        console.log("USDTAmount Balance in contract: ", amountOut);
        return amountOut
    } catch (error) {
        console.error("Error calling contract method:", error);
    }
}