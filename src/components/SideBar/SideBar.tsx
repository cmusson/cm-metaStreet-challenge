import SendToken from "../SendToken";
import styles from "./SideBar.module.scss";

interface ISideBarProps {
  connectWallet: () => Promise<void>;
  fetchNFTs: () => Promise<void>;
  walletConnected: boolean;
  senderAddress: string;
  contractAddress: string;
  tokenId: string;
}

const SideBar = ({
  connectWallet,
  fetchNFTs,
  walletConnected,
  senderAddress,
  contractAddress,
  tokenId,
}: ISideBarProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.titleLogo}>
        <h3>MetaStreet</h3>
        <img src="/logo.svg" alt="logo" />
      </div>
      <img src="/divider.svg" alt="element-divider" />
      <button
        disabled={walletConnected}
        onClick={() => {
          connectWallet();
          fetchNFTs();
        }}
      >
        <h5>{walletConnected ? "Wallet Connected!" : "Connect Wallet"}</h5>
      </button>
      <img src="/divider.svg" alt="element-divider" />

      <SendToken
        contractAddress={contractAddress}
        tokenId={tokenId}
        senderAddress={senderAddress}
      />

      <img src="/divider.svg" alt="element-divider" />
    </section>
  );
};

export default SideBar;
