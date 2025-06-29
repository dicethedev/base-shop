"use client";

import { useEffect, useState } from "react";
import { encodeFunctionData, erc20Abi, parseUnits } from "viem";
import { useSendCalls, useAccount } from "wagmi";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { CartSidebar } from "@/components/cart-sidebar";
import { OnchainWallet } from "@/components/onchain-wallet";
import { useCart } from "@/contexts/cart-context";
import { getProducts } from "@/lib/products";
import { sendReceiptEmail } from "@/lib/order-utils";
import { Store, Sparkles, ArrowLeft } from "lucide-react";
import { CheckoutFlow } from "@/components/checkout-flow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BASE_URL } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";

interface DataRequest {
  email: boolean;
  address: boolean;
  phone: boolean;
  name: boolean;
}

interface ProfileResult {
  success: boolean;
  email?: string;
  address?: string;
  phone?: string;
  name?: string;
  walletAddress?: string;
  error?: string;
}

export default function BaseShop() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [dataToRequest, setDataToRequest] = useState<DataRequest>({
    email: true,
    address: true,
    phone: false,
    name: true,
  });
  const [result, setResult] = useState<ProfileResult | null>(null);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const { sendCalls, data, error, isPending } = useSendCalls();
  const { address, isConnected } = useAccount();
  const { state: cartState, dispatch: cartDispatch } = useCart();

  const { showSuccess, showError } = useToast();

  const products = getProducts();

  // Function to get callback URL
  function getCallbackURL() {
    return `${BASE_URL}/api/data-validation`;
  }

  // Handle response data when sendCalls completes
  useEffect(() => {
    if (data?.capabilities?.dataCallback) {
      const callbackData = data.capabilities.dataCallback;
      const newResult: ProfileResult = {
        success: true,
        walletAddress: address,
      };

      if (callbackData.email) newResult.email = callbackData.email;
      if (callbackData.name) {
        newResult.name = `${callbackData.name.firstName} ${callbackData.name.familyName}`;
      }
      if (callbackData.phoneNumber) {
        newResult.phone = `+${callbackData.phoneNumber.country} ${callbackData.phoneNumber.number}`;
      }
      if (callbackData.physicalAddress) {
        const addr = callbackData.physicalAddress;
        newResult.address = [
          addr.address1,
          addr.address2,
          addr.city,
          addr.state,
          addr.postalCode,
          addr.countryCode,
        ]
          .filter(Boolean)
          .join(", ");
      }

      setResult(newResult);

      // Send receipt email if we have customer email
      if (newResult.email && cartState.items.length > 0) {
        sendReceiptEmail({
          email: newResult.email,
          name: newResult.name,
          walletAddress: newResult.walletAddress,
          items: cartState.items,
          total: cartState.total,
          address: newResult.address,
          phone: newResult.phone,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              showSuccess(
                "Receipt sent!",
                "A confirmation email has been sent to your inbox."
              );
            } else {
              console.error("Failed to send receipt email:", data.error);
              showError(
                "Email failed",
                "Receipt email could not be sent, but your order was successful."
              );
            }
          })
          .catch((error) => {
            console.error("Receipt email error:", error);
            showError(
              "Email failed",
              "Receipt email could not be sent, but your order was successful."
            );
          });
      }

      cartDispatch({ type: "CLEAR_CART" });
    } else if (data && !data.capabilities?.dataCallback) {
      setResult({
        success: false,
        error: "Invalid response - no profile data received",
      });
    }
  }, [
    data,
    address,
    cartDispatch,
    cartState.items,
    cartState.total,
    showError,
    showSuccess,
  ]);

  // Handle errors
  useEffect(() => {
    if (error) {
      setResult({
        success: false,
        error: error.message || "Transaction failed",
      });
    }
  }, [error]);

  // Handle checkout submission
  async function handleCheckout() {
    try {
      setResult(null);

      if (cartState.items.length === 0) {
        setResult({ success: false, error: "Your cart is empty" });
        return;
      }

      // Check if any physical items require address
      const hasPhysicalItems = cartState.items.some(
        (item) => item.product.type === "physical"
      );

      if (hasPhysicalItems) {
        setDataToRequest((prev) => ({ ...prev, address: true }));
      }

      // Build requests array based on checkboxes
      const requests = [];
      if (dataToRequest.email)
        requests.push({ type: "email", optional: false });
      if (dataToRequest.address)
        requests.push({ type: "physicalAddress", optional: !hasPhysicalItems });
      if (dataToRequest.phone)
        requests.push({ type: "phoneNumber", optional: true });
      if (dataToRequest.name) requests.push({ type: "name", optional: false });

      if (requests.length === 0) {
        setResult({
          success: false,
          error: "Please select at least one data type to proceed",
        });
        return;
      }

      // Create transfer calls for each item in cart
      const calls = cartState.items.map((item) => ({
        to: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`, // USDC contract address on Base Sepolia
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: "transfer",
          args: [
            "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", // Recipient address
            parseUnits(
              (
                Number.parseFloat(item.product.price) * item.quantity
              ).toString(),
              6
            ),
          ],
        }),
      }));

      sendCalls({
        calls,
        chainId: 84532, // Base Sepolia
        capabilities: {
          dataCallback: {
            requests: requests,
            callbackURL: getCallbackURL(),
          },
        },
      });
    } catch (err) {
      setResult({
        success: false,
        error: err instanceof Error ? err.message : "Unknown error occurred",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
        {/* Mobile-Responsive Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
          {/* Logo and Title Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Store className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                Base Shop
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-tight">
                Smart Wallet checkout on Base
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
            <CartSidebar onCheckout={() => setShowCheckout(true)} />

            {/* {!isConnected ? (
              <Button
                onClick={() => connect({ connector: connectors[0] })}
                size="lg"
                className="transition-all duration-200 hover:scale-105 shadow-lg cursor-pointer"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Sign in
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => disconnect()}
                  className="transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  Sign out
                </Button>
              </div>
            )} */}
            <OnchainWallet />
          </div>
        </header>

        {!showCheckout ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-xl">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Experience the Future of E-commerce
                </h2>
                <p className="text-xl text-blue-100 mb-6">
                  Lightning-fast checkout with Smart Wallet Profiles. No forms,
                  no friction.
                </p>
                <Badge
                  variant="secondary"
                  className="text-blue-600 bg-white/90 backdrop-blur-sm"
                >
                  Powered by Base Smart Wallet
                </Badge>
              </div>
            </div>

            {/* Products Grid */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Featured Products
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Discover our collection of Base-themed items
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="text-sm self-start sm:self-auto"
                >
                  {products.length} Products
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Button
                variant="outline"
                onClick={() => setShowCheckout(false)}
                className="transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Checkout
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Complete your purchase with Smart Wallet
                </p>
              </div>
            </div>

            <CheckoutFlow
              dataToRequest={dataToRequest}
              setDataToRequest={setDataToRequest}
              agreedToPrivacy={agreedToPrivacy}
              setAgreedToPrivacy={setAgreedToPrivacy}
              result={result}
              isPending={isPending}
              isConnected={isConnected}
              onCheckout={handleCheckout}
              onConnectWallet={() => {
                // OnchainKit handles connection automatically
                console.log("Connect wallet triggered");
              }}
              onContinueShopping={() => {
                setShowCheckout(false);
                setResult(null);
                setAgreedToPrivacy(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
