import camelotV2RouterContract from "../../contracts/camelot/camelotV2RouterContract"

export const getCamelotV2SwapPrice = async(tokenIn: string, tokenOut: string, amountIn: number) => {
    try {
        const amountOut = await camelotV2RouterContract.methods.getAmountsOut(amountIn, [tokenIn, tokenOut]).call();
        console.log("CamelotV2 AmountsOut: ", amountOut);
    } catch (error) {
        console.error("Error calling contract method:", error);
    }
}