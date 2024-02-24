import { useBalance } from "wagmi";
import { useAccount } from "wagmi";
import { Token } from "./types";
import { ProxySend } from "./ProxySend";
import { encodeErc20Transfer } from "../helpers/encodeErc20Transfer";

export function TokenComponent({ token }: { token: Token }) {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
    token: token.address as `0x${string}`,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
      <ProxySend
        proxyAddress={
          `0x2815cb20C1063F27D6e5d04B6CD2904Af5544Bff` as `0x${string}`
        }
        target={token.address as `0x${string}`}
        callData={encodeErc20Transfer(
          "0xe793A7a7c7b7A4CeFDDb30F856b01f36E51B1b82" as `0x${string}`,
          1n
        )}
      />
    </div>
  );
}
