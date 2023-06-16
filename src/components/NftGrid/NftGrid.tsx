import { INft } from "../../util/interfaces";
import NftItem from "../NftItem";
import styles from "./NftGrid.module.scss";

interface INewNft {
  src: string;
  address: string;
  id: number;
  collectionSrc: string;
  error?: string;
}

interface IGridProps {
  nfts?: INewNft[] | undefined;
}

const NftGrid = ({ nfts }: IGridProps) => {
  return (
    <div className={styles.container}>
      {nfts &&
        nfts.map((nft, i) => (
          <NftItem
            src={nft.error ? nft.collectionSrc : nft.src}
            address={nft.address}
            id={nft.id}
            key={`${nft.id} ${nft.address} ${i}`}
            collectionSrc={nft.collectionSrc}
            error={nft.error}
          />
        ))}
    </div>
  );
};

export default NftGrid;
