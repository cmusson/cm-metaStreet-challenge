import { trimAddress } from "../../util/functions/functions";
import { INewNft } from "../../util/interfaces";
import NftGrid from "../NftGrid";
import styles from "./MainSection.module.scss";

interface IMainSection {
  walletConnected: boolean;
  address: string;
  nfts?: INewNft[];
}

const MainSection = ({ walletConnected, address, nfts }: IMainSection) => {
  return (
    <section className={styles.container}>
      <div>
        {walletConnected ? (
          <h1>Your NFTs</h1>
        ) : (
          <h1>Connect your wallet and view your NFTs</h1>
        )}

        {walletConnected ? (
          <h3>Wallet address: {trimAddress(address.toString())}</h3>
        ) : (
          <h3>Wallet not connected</h3>
        )}
      </div>

      <NftGrid nfts={nfts} />
    </section>
  );
};

export default MainSection;
