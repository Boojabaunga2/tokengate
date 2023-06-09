import { useAddress, useDisconnect, ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import styles from "../styles/Theme.module.css";

export default function Header() {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  const disconnectWallet = useDisconnect();

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link href="/" passHref>
          <img
            src={`/fiverr.png`}
            alt="Thirdweb Logo"
            className={styles.headerLogo}
            style={{maxWidth:60}}
          />
        </Link>
        <Link href="/admin">
          <a className={styles.headerItem} style={{minWidth:100}}>All Token Gates</a>
        </Link>
       
      </div>

      <div className={styles.right}>
        {address ? (
          <>
            <a
              className={styles.secondaryButton}
              onClick={() => disconnectWallet()}
            >
              Disconnect
            </a>
            <p className={styles.verticalSpacer}>|</p>
            <p>{address.slice(0, 6).concat("...").concat(address.slice(-4))}</p>
          </>
        ) : (
          <ConnectWallet accentColor="#5204BF" colorMode="dark" />
        )}
      </div>
    </div>
  );
}