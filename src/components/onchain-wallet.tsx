"use client";

import { useState, useRef, useEffect } from "react";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import { useAccount } from "wagmi";

export function OnchainWallet() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount();
  const walletRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        walletRef.current &&
        !walletRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (isConnected) {
      setIsOpen(!isOpen);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex justify-end relative" ref={walletRef}>
      <Wallet>
        <div onClick={handleToggle}>
          <ConnectWallet
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 transition-all duration-200 hover:scale-105 shadow-lg rounded-lg px-4 py-2 font-medium cursor-pointer"
            disconnectedLabel="Sign in"
          >
            <Avatar className="h-6 w-6" />
            <Name className="text-white font-medium" />
          </ConnectWallet>
        </div>

        {isConnected && isOpen && (
          <WalletDropdown className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
            {/* Identity Section */}
            <Identity
              className="px-6 py-4 hover:bg-blue-50 transition-colors border-b border-gray-100"
              hasCopyAddressOnClick
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12" />
                <div className="flex-1 min-w-0">
                  <Name className="font-semibold text-gray-900 block truncate" />
                  <Address
                    className={`${color.foregroundMuted} text-sm block truncate`}
                  />
                  <EthBalance className="text-sm font-medium text-blue-600 mt-1" />
                </div>
              </div>
            </Identity>

            {/* Basename Section */}
            <WalletDropdownBasename className="px-6 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 flex items-center gap-3 text-gray-700 hover:text-blue-600" />

            {/* Action Links */}
            <div className="py-2">
              <WalletDropdownLink
                className="px-6 py-3 hover:bg-blue-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-blue-600 w-full"
                icon="wallet"
                href="https://keys.coinbase.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Manage Wallet
              </WalletDropdownLink>

              <WalletDropdownFundLink className="px-6 py-3 hover:bg-blue-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-blue-600 w-full" />
            </div>

            {/* Disconnect Section */}
            <div className="border-t border-gray-100 py-2">
              <div onClick={handleClose}>
                <WalletDropdownDisconnect className="px-6 py-3 hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600 hover:text-red-700 w-full font-medium" />
              </div>
            </div>
          </WalletDropdown>
        )}
      </Wallet>
    </div>
  );
}
