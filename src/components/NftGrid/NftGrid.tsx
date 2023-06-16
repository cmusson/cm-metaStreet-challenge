import { INft } from "../../util/interfaces";
import NftItem from "../NftItem";
import styles from "./NftGrid.module.scss";

interface IGridProps {
  nfts: INft[];
}

const NftGrid = ({ nfts }: IGridProps) => {
  return (
    <div className={styles.container}>
      {nfts.map((nft) => (
        <NftItem
          src={nft.src}
          address={nft.address}
          id={nft.id}
          key={nft.id}
          collectionSrc={""}
        />
      ))}
    </div>
  );
};

export default NftGrid;
