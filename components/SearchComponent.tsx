import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { TokenList, Token } from "./types";
import { TokenComponent } from "./TokenComponent";

function SearchComponent() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<TokenList | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Migratooor/tokenLists/main/lists/ajna.json"
    )
      .then((response) => response.json())
      .then((data) => setData(data.tokens));
  }, []);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(event.target.value);
  };

  const handleSelect = (event: { target: { value: string } }) => {
    const selectedToken = data?.find(
      (token) => token.address === event.target.value
    );
    selectedToken && setSelectedToken(selectedToken);
  };

  const results = data?.filter((token) =>
    token.address.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} style={{width: '100%', borderRadius: '5px'}} />
      {input.length >= 3 && data && (
        <select onChange={handleSelect} style={{width: '100%', borderRadius: '5px'}}>
          {results &&
            results.map((token) => (
              <option key={token.address} value={token.address}>
                {token.symbol}: {token.name}
              </option>
            ))}
        </select>
      )}
      {selectedToken && (
        <Image
          src={selectedToken.logoURI}
          alt={selectedToken.name}
          width={50}
          height={50}
        />
      )}
      {selectedToken && <TokenComponent token={selectedToken} />}
    </div>
  );
}

export default SearchComponent;
