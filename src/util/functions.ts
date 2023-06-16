import { Dispatch, SetStateAction } from "react";

export const trimAddress = (address: string): string => {
  if (address.length < 10) {
    return address;
  } else {
    const leftSide = address.slice(0, 4);
    const rightSide = address.slice(-4);
    return leftSide + "..." + rightSide;
  }
};

// not used yet
export const copyAddress = (
  address: string
  // setIcon: Dispatch<SetStateAction<string>>
) => {
  // Copies to clipboard
  navigator.clipboard.writeText(address);
  //   setIcon("/copiedIcon.svg");

  //   setTimeout(() => {
  //     setIcon("/copyIcon.svg");
  //   }, 1000);
};

// not used yet
const openInNewTab = (address: string): void => {
  const newWindow = window.open(
    `https://etherscan.io/address/${address}`,
    "_blank",
    "noopener,noreferrer"
  );
  if (newWindow) newWindow.opener = null;
};

export const onClickUrl =
  (url: string): (() => void) =>
  () =>
    openInNewTab(url);
