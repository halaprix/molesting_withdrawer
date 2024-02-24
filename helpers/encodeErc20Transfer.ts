import { encodeFunctionData } from "viem";
import { erc20Abi } from "../contracts/erc20";

export const encodeErc20Transfer = (to: `0x${string}`, amount: bigint) => {
  return encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [to, amount],
  });
};
