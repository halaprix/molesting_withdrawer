import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { dpmAbi } from "../contracts/dpm";

export function ProxySend({
  proxyAddress,
  target,
  callData,
}: {
  proxyAddress: `0x${string}`;
  target: `0x${string}`;
  callData: `0x${string}`;
}) {
  const { config } = usePrepareContractWrite({
    address: proxyAddress,
    abi: dpmAbi,
    functionName: "execute",
    args: [target, callData],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
console.log("write",write)
  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        Sned!
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
