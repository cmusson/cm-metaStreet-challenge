import { useState } from "react";
import styles from "./SendToken.module.scss";
import { transferNFT } from "../../util/functions/api";
import { allowTransfer } from "../../util/functions/functions";

interface ISendToken {
  contractAddress: string;
  senderAddress: string;
  tokenId: string;
}

const SendToken = ({ contractAddress, tokenId, senderAddress }: ISendToken) => {
  //user types
  const [recipientAddress, setRecipientAddress] = useState("");

  const handleTransfer = () => {
    transferNFT(
      contractAddress,
      tokenId,
      senderAddress.toString(),
      recipientAddress
    );
  };
  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          value={contractAddress}
          placeholder="NFT Contract Address"
        />
        <input type="text" value={tokenId} placeholder="Token ID" />
        <input
          type="text"
          value={senderAddress.toString()}
          placeholder="Sender Wallet Address"
        />
        <input
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          placeholder="Recipient Wallet Address"
        />
      </div>
      <button
        disabled={
          !allowTransfer(
            recipientAddress,
            contractAddress,
            tokenId,
            senderAddress
          )
        }
        onClick={handleTransfer}
      >
        Transfer NFT
      </button>
    </div>
  );
};

export default SendToken;
