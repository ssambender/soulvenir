'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface WalletContextType {
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  connectWallet: async () => {},
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error('MetaMask connection error:', err);
      }
    } else {
      alert('No MetaMask detected. Download @ https://metamask.io/');
    }
  };

  useEffect(() => {
    if ((window as any).ethereum && (window as any).ethereum.selectedAddress) {
      setWalletAddress((window as any).ethereum.selectedAddress);
    }
  }, []);

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
