import sushiswapV2Router02Contract from "../../contracts/sushiswap/sushiswapV2Router02Contract"

export const getSushiSwapPrice = async(tokenIn: string, tokenOut: string, amountIn: number) => {
    try {
        const amountOut = await sushiswapV2Router02Contract.methods.getAmountsOut(amountIn, [tokenIn, tokenOut]).call();
        console.log("SushiSwapV2 AmountsOut: ", amountOut);
    } catch (error) {
        console.error("Error calling contract method:", error);
    }
}