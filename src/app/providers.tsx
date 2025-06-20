"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { OnchainKitProvider } from "@coinbase/onchainkit"
import { baseSepolia } from "wagmi/chains"
import { getConfig } from "@/lib/wagmi"
import { CartProvider } from "@/contexts/cart-context"

const queryClient = new QueryClient()
const config = getConfig()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
          config={{
            appearance: {
              mode: "auto",
              theme: "base",
            },
          }}
        >
          <CartProvider>{children}</CartProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
