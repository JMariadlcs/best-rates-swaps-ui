import axios from "axios";
import BigNumber from "bignumber.js";
import { OptimalRate, SwapSide } from "paraswap-core";

export const API_URL = "https://apiv5.paraswap.io";
export const USER_ADDRESS ='0xF258BAFeCe36CB5543fb2121A4fd1Dd1079a49B9';

const PARTNER = "chucknorris";
const SLIPPAGE = 1; // 1%

enum Networks {
  MAINNET = 1,
  POLYGON = 137,
  ARBITRUM = 42161
}

interface MinTokenData {
  decimals: number;
  symbol: string;
  address: string;
}

const tokens: Record<number, MinTokenData[]> = {
  [Networks.MAINNET]: [
    {
      decimals: 18,
      symbol: "ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
    },
    {
      decimals: 6,
      symbol: "USDC",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    },
    {
      decimals: 18,
      symbol: "DAI",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    }
  ],
  [Networks.ARBITRUM]: [
    {
      decimals: 18,
      symbol: "ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
    },
    {
      decimals: 18,
      symbol: "WETH",
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
    },
    {
      decimals: 6,
      symbol: "USDT",
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
    }
  ]
};

export function getToken(symbol: Symbol, networkID = Networks.MAINNET): MinTokenData {
  const token = tokens[networkID]?.find((t) => t.symbol === symbol);

  if (!token)
    throw new Error(`Token ${symbol} not available on network ${networkID}`);
  return token;
}

/**
 * @type ethereum address
 */
type Address = string;
/**
 * @type Token symbol
 */
type Symbol = string;
/**
 * @type number as string
 */
type NumberAsString = string;

interface TransactionParams {
  to: Address;
  from: Address;
  value: NumberAsString;
  data: string;
  gasPrice: NumberAsString;
  gas?: NumberAsString;
  chainId: number;
}

interface Swapper {
  getRate(params: {
    srcToken: Pick<MinTokenData, "address" | "decimals">;
    destToken: Pick<MinTokenData, "address" | "decimals">;
    srcAmount: NumberAsString;
    partner?: string;
  }): Promise<OptimalRate>;
  buildSwap(params: {
    srcToken: Pick<MinTokenData, "address" | "decimals">;
    destToken: Pick<MinTokenData, "address" | "decimals">;
    srcAmount: NumberAsString;
    minAmount: NumberAsString;
    priceRoute: OptimalRate;
    userAddress: Address;
    receiver?: Address;
    partner?: string;
  }): Promise<TransactionParams>;
}

export function createSwapper(networkID: number, apiURL: string): Swapper {
  type PriceQueryParams = {
    srcToken: string;
    destToken: string;
    srcDecimals: string;
    destDecimals: string;
    amount: string;
    side: SwapSide;
    network: string;
    partner: string;
  };

  const getRate: Swapper["getRate"] = async ({
    srcToken,
    destToken,
    srcAmount,
    partner = PARTNER
  }) => {
    const queryParams: PriceQueryParams = {
      srcToken: srcToken.address,
      destToken: destToken.address,
      srcDecimals: srcToken.decimals.toString(),
      destDecimals: destToken.decimals.toString(),
      amount: srcAmount,
      side: SwapSide.SELL,
      network: networkID.toString(),
      partner
    };

    const searchString = new URLSearchParams(queryParams);

    const pricesURL = `${apiURL}/prices/?${searchString}`;
    console.log("GET /price URL", pricesURL);

    const {
      data: { priceRoute }
    } = await axios.get<{ priceRoute: OptimalRate }>(pricesURL);

    return priceRoute;
  };

  interface BuildTxBody {
    srcToken: Address;
    destToken: Address;
    srcAmount: NumberAsString;
    destAmount: NumberAsString;
    priceRoute: OptimalRate;
    userAddress: Address;
    partner?: string;
    receiver?: Address;
    srcDecimals?: number;
    destDecimals?: number;
  }

  const buildSwap: Swapper["buildSwap"] = async ({
    srcToken,
    destToken,
    srcAmount,
    minAmount,
    priceRoute,
    userAddress,
    receiver,
    partner
  }) => {
    const txURL = `${apiURL}/transactions/${networkID}`;

    const txConfig: BuildTxBody = {
      priceRoute,
      srcToken: srcToken.address,
      srcDecimals: srcToken.decimals,
      destToken: destToken.address,
      destDecimals: destToken.decimals,
      srcAmount,
      destAmount: minAmount,
      userAddress,
      partner,
      receiver
    };

    const { data } = await axios.post<TransactionParams>(txURL, txConfig);

    return data;
  };

  return { getRate, buildSwap };
}

interface GetSwapTxInput {
  srcToken: Symbol;
  destToken: Symbol;
  srcAmount: NumberAsString; // in srcToken denomination
  networkID: number;
  slippage?: number;
  partner?: string;
  userAddress: Address;
  receiver?: Address;
}

export async function getSwapTransaction({
  srcToken: srcTokenSymbol,
  destToken: destTokenSymbol,
  srcAmount: _srcAmount,
  networkID,
  slippage = SLIPPAGE,
  ...rest
}: GetSwapTxInput): Promise<TransactionParams> {
  try {
    const srcToken = getToken(srcTokenSymbol, networkID);
    const destToken = getToken(destTokenSymbol, networkID);

    const srcAmount = new BigNumber(_srcAmount)
      .times(10 ** srcToken.decimals)
      .toFixed(0);

    const ps = createSwapper(networkID, API_URL);

    const priceRoute = await ps.getRate({
      srcToken,
      destToken,
      srcAmount
    });

    console.log("priceRoute", priceRoute)

    const minAmount = new BigNumber(priceRoute.destAmount)
      .times(1 - slippage / 100)
      .toFixed(0);
    const transactionRequest = await ps.buildSwap({
      srcToken,
      destToken,
      srcAmount,
      minAmount,
      priceRoute,
      ...rest
    });

    console.log("TransactionRequest", transactionRequest);

    return transactionRequest;
  } catch (error: any) {
    console.log("Error", error)
    console.error(error.response.data);
    throw new Error(error.response.data.error);
  }
}

export const getExampleSwapTransaction = () =>
  getSwapTransaction({
    srcAmount: "1",
    srcToken: "MATIC",
    destToken: "WBTC",
    networkID: Networks.POLYGON,
    userAddress: USER_ADDRESS
  });
