import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { trimAddress } from "./util/functions";
import { ethers } from "ethers";
import { BrowserProvider, Eip1193Provider } from "ethers/providers";
import SideBar from "./components/SideBar";
import NftGrid from "./components/NftGrid";

interface NFTContract {
  address: string;
}

interface TokenMetadata {
  tokenType: string;
}

interface TokenId {
  tokenId: string;
  tokenMetadata: TokenMetadata;
}

interface TokenUri {
  raw: string;
  gateway: string;
}

interface Media {
  raw: string;
  gateway: string;
}

interface Attribute {
  value: string;
  trait_type: string;
}

interface Metadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Attribute[];
}

interface OwnedNFT {
  contract: NFTContract;
  id: TokenId;
  title: string;
  description: string;
  tokenUri: TokenUri;
  media: Media[];
  metadata: Metadata;
  timeLastUpdated: string;
}

interface NFTApiResponse {
  ownedNfts: OwnedNFT[];
  totalCount: number;
  blockHash: string;
}

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
  }
}

interface INewNft {
  src: string;
  address: string;
  id: number;
  collectionSrc: string;
  error?: string;
}

function App() {
  const [address, setAddress] = useState(0);
  const [nfts, setNfts] = useState<INewNft[]>();
  const [walletConnected, setWalletConnected] = useState(false);

  console.log("KEY", import.meta.env.VITE_ALCHEMY_API_KEY);

  // display users account when connected
  const requestAccountAddress = async () => {
    //check if metamask exists
    if ((window as Window).ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(
          (window.ethereum as any).networkVersion,
          "window.ethereum.networkVersion"
        );
        console.log(accounts);
        setAddress(() => accounts[0]);
        setWalletConnected(() => true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not detected");
    }
    //
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccountAddress();

      const provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      console.log("metamask not detected");
    }
  };

  const fetchNFTs = async () => {
    const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
    const walletAddress = "0x63a5B6497F01BB876EA3a343Ec8991252aABAEaF";
    const pwalletAddress = "elanhalpern.eth";
    const network = "mainnet";
    const purl =
      "https://eth-mainnet.g.alchemy.com/v2/BFFh1bb4akn6vzbxsT69Hx1lVCCvC2-d/getNFTs/?owner=vitalik.eth";
    const url = `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}/getNFTs/?owner=${pwalletAddress}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log("Error!");
      }
      const data = await response.json();
      console.log("response NFTs ------->", data.ownedNfts);
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
        };
        return newNft;
      });
      setNfts(nfts);
      console.log("data ======>", data);
      console.log("nfts =======>", nfts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="app-container">
      <SideBar
        connectWallet={connectWallet}
        fetchNFTs={fetchNFTs}
        walletConnected={walletConnected}
      />

      <section className="section">
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
    </main>
  );
}

export default App;
