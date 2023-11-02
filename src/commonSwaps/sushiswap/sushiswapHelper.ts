import sushiswapV2Router02Contract from "../../contracts/sushiswap/sushiswapV2Router02Contract"

export const getSushiSwapPrice = async(tokenIn: string, tokenOut: string, amountIn: number) => {
    console.log("sushiswapV2Router02Contract", await sushiswapV2Router02Contract.methods)
    try {
        // const amountOut = await sushiswapV2Router02Contract.methods.getAmountsOut(amountIn).call();
        //console.log("Amount Out", amountOut);
    } catch (error) {
        console.error("Error calling contract method:", error);
    }
}