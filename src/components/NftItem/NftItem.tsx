import { onClickUrl, trimAddress } from "../../util/functions";
import { INft } from "../../util/interfaces";
import styles from "./NftItem.module.scss";

interface INewNft {
  src: string;
  address: string;
  id: number;
  collectionSrc: string;
  error?: string;
}

// picture
// token address + etherscan link
// token ID

const NftItem = ({ src, address, id, error }: INewNft) => {
  return (
    <div className={styles.container} onClick={onClickUrl(address)}>
      <img src={src} alt="nft" style={{ maxWidth: 100 }} />
      {error ? <h5>collection image</h5> : <></>}
      <div className={styles.nftInfo}>
        <h4 title={id.toString()}>{`Id: ${trimAddress(id.toString())}`}</h4>
        <h4
          onClick={() => {
            return;
          }}
          title={address}
        >{`Address: ${trimAddress(address)}`}</h4>
      </div>
    </div>
  );
};

export default NftItem;
