import styles from "./SideBar.module.scss";

interface ISideBarProps {
  connectWallet: () => Promise<void>;
  fetchNFTs: () => Promise<void>;
  walletConnected: boolean;
}

const SideBar = ({
  connectWallet,
  fetchNFTs,
  walletConnected,
}: ISideBarProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.titleLogo}>
        <h3>MetaStreet</h3>
        <img src="/logo.svg" alt="logo" />
      </div>
      <img src="/divider.svg" alt="element-divider" />
      <button
        // className={`${styles.rainbow} ${styles.z}`}
        disabled={walletConnected}
        onClick={() => {
          connectWallet();
          fetchNFTs();
        }}
      >
        <h5>{walletConnected ? "Wallet Connected!" : "Connect Wallet"}</h5>
      </button>
      <img src="/divider.svg" alt="element-divider" />
    </section>
  );
};

export default SideBar;

{
  /* <svg viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M32.665 8.596 17.835.09a.661.661 0 0 0-.67 0L2.336 8.596c-.724.415-.472 1.69.334 1.69h29.66c.806 0 1.058-1.275.334-1.69Z"
    fill="#fff"
  ></path>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M8.37 26.684a6.869 6.869 0 0 0 5.128-2.286h8.088a6.869 6.869 0 0 0 5.126 2.286c3.799 0 6.878-3.071 6.878-6.86s-3.08-6.86-6.878-6.86H8.371c-3.799 0-6.878 3.071-6.878 6.86s3.08 6.86 6.878 6.86Zm.49-10.127a.092.092 0 0 0-.092-.09H6.873c-.05 0-.092.04-.092.09v1.982H4.794a.092.092 0 0 0-.091.092v1.89c0 .05.04.092.091.092h1.987v1.982c0 .05.041.09.092.09h1.895c.05 0 .092-.04.092-.09v-1.982h1.987c.05 0 .092-.041.092-.092v-1.89a.092.092 0 0 0-.092-.092H8.86v-1.982Zm15.56 4.528c.708 0 1.283-.573 1.283-1.28 0-.708-.575-1.28-1.284-1.28a1.28 1.28 0 1 0 .001 2.56Zm6.419-1.28c0 .707-.575 1.28-1.284 1.28-.71 0-1.284-.573-1.284-1.28 0-.708.575-1.28 1.284-1.28.71 0 1.284.572 1.284 1.28Zm-5.136-2.561c0 .707.575 1.28 1.284 1.28a1.281 1.281 0 1 0 0-2.561c-.709 0-1.284.573-1.284 1.28Zm1.284 6.402a1.282 1.282 0 0 1-1.284-1.28c0-.707.575-1.28 1.284-1.28.71 0 1.284.573 1.284 1.28 0 .707-.575 1.28-1.284 1.28Zm-12.105-7.938a.733.733 0 1 0 0 1.464h4.677a.733.733 0 1 0 0-1.464h-4.677Z"
    fill="#fff"
  ></path>
  <path
    d="M32.097 29.438H2.903a.995.995 0 0 0 0 1.99h29.194a.995.995 0 0 0 0-1.99Zm1.908 3.318H.995a.995.995 0 0 0 0 1.99h33.01a.995.995 0 0 0 0-1.99Z"
    fill="#fff"
  ></path>
</svg>; */
}
