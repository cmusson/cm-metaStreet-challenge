export interface INewNft {
  src: string;
  address: string;
  id: number;
  collectionSrc: string;
  error?: string;
  setNftTransferInfo: (nftAddress: string, tokenId: number) => void;
}
