import { onClickUrl, trimAddress } from "../../util/functions/functions";
import { INewNft } from "../../util/interfaces";
import styles from "./NftItem.module.scss";

// picture
// token address + etherscan link
// token ID

const NftItem = ({ src, address, id, error, setNftTransferInfo }: INewNft) => {
  return (
    <div
      className={styles.container}
      onClick={() => setNftTransferInfo(address, id)}
    >
      <img src={src} alt="nft" style={{ maxWidth: 100 }} />
      {error ? <h5>collection image</h5> : <></>}
      <div className={styles.nftInfo}>
        <h4 title={id.toString()}>{`Id: ${trimAddress(id.toString())}`}</h4>
        <h4
          onClick={onClickUrl(address)}
          title={address}
          className={styles.address}
        >{`Address: ${trimAddress(address)}`}</h4>
      </div>
    </div>
  );
};

export default NftItem;
