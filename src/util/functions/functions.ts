export const trimAddress = (address: string): string => {
  if (address.length < 10) {
    return address;
  } else {
    const leftSide = address.slice(0, 4);
    const rightSide = address.slice(-4);
    return leftSide + "..." + rightSide;
  }
};

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

export const allowTransfer = (
  str1: string,
  str2: string,
  str3: string,
  str4: string
) => {
  return str1 !== "" && str2 !== "" && str3 !== "" && str4 !== "";
};
