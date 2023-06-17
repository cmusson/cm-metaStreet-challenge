import { ethers } from "ethers";
import { INewNft } from "../interfaces";

export const fetchNFTs = async (
  setNftTransferInfo: (nftAddress: string, tokenId: number) => void,
  setNfts: React.Dispatch<React.SetStateAction<INewNft[] | undefined>>,
  walletAddress: string
) => {
  const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;

  const url = `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}/getNFTs/?owner=${walletAddress}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("NFT fetch error");
    }
    const data = await response.json();
    const nfts = data.ownedNfts.map((nft: any) => {
      const src = nft.media[0].thumbnail
        ? nft.media[0].thumbnail
        : nft.media[0].raw;
      const newNft: INewNft = {
        src: src,
        address: nft.contract.address,
        id: nft.id.tokenId,
        collectionSrc: nft.contractMetadata.openSea.imageUrl,
        error: nft.error,
        setNftTransferInfo: setNftTransferInfo,
      };
      return newNft;
    });
    setNfts(nfts);
  } catch (error) {
    console.error(error);
  }
};

export const transferNFT = async (
  contractAddress: string,
  senderAddress: string,
  recipientAddress: string,
  tokenId: string
) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Get the contract ABI from Etherscan
    const abiResponse = await fetch(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}`
    );
    const abiJson = await abiResponse.json();
    const abi = JSON.parse(abiJson.result);

    // Create a contract instance using the ABI
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const signer = await provider.getSigner();

    // Transfer the NFT -error in the logic
    const transaction = await signer.sendTransaction({
      from: senderAddress,
      to: recipientAddress,
      value: tokenId,
    });

    await transaction.wait();
  } catch (error) {
    console.error("Failed to transfer NFT:", error);
  }
};
