import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserProvider, Eip1193Provider } from "ethers/providers";
import "./App.scss";
import { INewNft } from "./util/interfaces";
import SideBar from "./components/SideBar";
import MainSection from "./components/MainSection";
import { fetchNFTs } from "./util/functions/api";

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
  }
}

const App = () => {
  const [address, setAddress] = useState("");
  const [nfts, setNfts] = useState<INewNft[]>();
  const [walletConnected, setWalletConnected] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");

  const setNftTransferInfo = (nftAddress: string, tokenId: number) => {
    setContractAddress(nftAddress);
    setTokenId(tokenId.toString());
  };

  // display users account when connected
  const requestAccountAddress = async () => {
    //check if metamask exists
    if ((window as Window).ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);

        // MetaMask requires requesting permission to connect users accounts
        const accounts = await provider.send("eth_requestAccounts", []);

        setAddress(() => accounts[0]);

        setWalletConnected(() => true);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("error detected");
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccountAddress();
    } else {
      console.error("metamask not detected");
    }
  };

  useEffect(() => {
    if (address !== "") {
      fetchNFTs(setNftTransferInfo, setNfts, address);
    }
  }, [address]);

  return (
    <main className="app-container">
      <SideBar
        connectWallet={connectWallet}
        fetchNFTs={() => fetchNFTs(setNftTransferInfo, setNfts, address)}
        walletConnected={walletConnected}
        senderAddress={address}
        contractAddress={contractAddress}
        tokenId={tokenId}
      />

      <MainSection
        walletConnected={walletConnected}
        address={address}
        nfts={nfts}
      />
    </main>
  );
};

export default App;
