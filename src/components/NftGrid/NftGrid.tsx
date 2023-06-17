import { INewNft } from "../../util/interfaces";
import NftItem from "../NftItem";
import styles from "./NftGrid.module.scss";

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
            setNftTransferInfo={nft.setNftTransferInfo}
          />
        ))}
    </div>
  );
};

export default NftGrid;
