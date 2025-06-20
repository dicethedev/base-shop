"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PrivacyPolicy } from "@/components/privacy-policy";
import { useCart } from "@/contexts/cart-context";
import {
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  MapPin,
  Phone,
  Wallet,
} from "lucide-react";

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

interface CheckoutFlowProps {
  dataToRequest: DataRequest;
  setDataToRequest: (
    data: DataRequest | ((prev: DataRequest) => DataRequest)
  ) => void;
  agreedToPrivacy: boolean;
  setAgreedToPrivacy: (agreed: boolean) => void;
  result: ProfileResult | null;
  isPending: boolean;
  isConnected: boolean;
  onCheckout: () => void;
  onContinueShopping: () => void;
  onConnectWallet: () => void;
}

export function CheckoutFlow({
  dataToRequest,
  setDataToRequest,
  agreedToPrivacy,
  setAgreedToPrivacy,
  result,
  isPending,
  isConnected,
  onCheckout,
  onContinueShopping,
  onConnectWallet,
}: CheckoutFlowProps) {
  const { state: cartState } = useCart();
  const resultRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to results when payment is confirmed
  useEffect(() => {
    if (result && resultRef.current) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100);
    }
  }, [result]);

  return (
    <div className="space-y-8">
      {/* Order Summary */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            Order Summary
          </CardTitle>
          <CardDescription>Review your items before checkout</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cartState.items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.title}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {(
                      Number.parseFloat(item.product.price) * item.quantity
                    ).toFixed(3)}{" "}
                    USDC
                  </p>
                  <p className="text-xs text-gray-500">
                    ~$
                    {(
                      Number.parseFloat(item.product.price) *
                      item.quantity *
                      1
                    ).toFixed(2)}{" "}
                    USD
                  </p>
                </div>
              </div>
            ))}

            <Separator />

            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <div className="text-right">
                <span className="text-blue-600">
                  {cartState.total.toFixed(3)} USDC
                </span>
                <p className="text-sm text-gray-500 font-normal">
                  ~${(cartState.total * 1).toFixed(2)} USD
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Policy */}
      <PrivacyPolicy />

      {/* Data Collection Settings */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Checkout Information
          </CardTitle>
          <CardDescription>
            Select the information needed for your order. Physical items require
            shipping address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="email"
                checked={dataToRequest.email}
                onCheckedChange={(checked) =>
                  setDataToRequest((prev) => ({
                    ...prev,
                    email: !!checked,
                  }))
                }
              />
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium cursor-pointer"
              >
                <Mail className="h-4 w-4 text-blue-600" />
                Email Address
                <Badge variant="destructive" className="text-xs">
                  Required
                </Badge>
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="name"
                checked={dataToRequest.name}
                onCheckedChange={(checked) =>
                  setDataToRequest((prev) => ({
                    ...prev,
                    name: !!checked,
                  }))
                }
              />
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium cursor-pointer"
              >
                <User className="h-4 w-4 text-blue-600" />
                Full Name
                <Badge variant="destructive" className="text-xs">
                  Required
                </Badge>
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="address"
                checked={dataToRequest.address}
                onCheckedChange={(checked) =>
                  setDataToRequest((prev) => ({
                    ...prev,
                    address: !!checked,
                  }))
                }
              />
              <label
                htmlFor="address"
                className="flex items-center gap-2 text-sm font-medium cursor-pointer"
              >
                <MapPin className="h-4 w-4 text-blue-600" />
                Shipping Address
                <Badge variant="secondary" className="text-xs">
                  Optional
                </Badge>
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="phone"
                checked={dataToRequest.phone}
                onCheckedChange={(checked) =>
                  setDataToRequest((prev) => ({
                    ...prev,
                    phone: !!checked,
                  }))
                }
              />
              <label
                htmlFor="phone"
                className="flex items-center gap-2 text-sm font-medium cursor-pointer"
              >
                <Phone className="h-4 w-4 text-blue-600" />
                Phone Number
                <Badge variant="secondary" className="text-xs">
                  Optional
                </Badge>
              </label>
            </div>
          </div>

          <Separator />

          <div className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Checkbox
              id="privacy"
              checked={agreedToPrivacy}
              onCheckedChange={(checked) => setAgreedToPrivacy(!!checked)}
            />
            <label htmlFor="privacy" className="text-sm cursor-pointer">
              I agree to the privacy policy and data collection terms above
            </label>
          </div>

          <Button
            onClick={isConnected ? onCheckout : onConnectWallet}
            disabled={isPending || (isConnected && !agreedToPrivacy)}
            className="w-full h-14 text-lg transition-all duration-200 hover:scale-105 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 cursor-pointer"
            size="lg"
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                Processing Payment...
              </>
            ) : !isConnected ? (
              <>
                <Wallet className="w-5 h-5 mr-3" />
                Sign in to Pay
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5 mr-3" />
                Pay {cartState.total.toFixed(3)} USDC
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Display */}
      {result && (
        <Card
          ref={resultRef}
          className={`shadow-lg ${
            result.success ? "border-green-200" : "border-red-200"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-600" />
              )}
              {result.success ? "Order Completed!" : "Order Failed"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.success ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium mb-3">
                    🎉 Your order has been processed successfully!
                  </p>
                  <div className="space-y-2 text-sm">
                    {result.walletAddress && (
                      <p>
                        <strong>Wallet:</strong> {result.walletAddress}
                      </p>
                    )}
                    {result.email && (
                      <p>
                        <strong>Email:</strong> {result.email}
                      </p>
                    )}
                    {result.name && (
                      <p>
                        <strong>Name:</strong> {result.name}
                      </p>
                    )}
                    {result.address && (
                      <p>
                        <strong>Shipping Address:</strong> {result.address}
                      </p>
                    )}
                    {result.phone && (
                      <p>
                        <strong>Phone:</strong> {result.phone}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  You'll receive a confirmation email shortly with tracking
                  information.
                </p>
                <Button
                  onClick={onContinueShopping}
                  className="w-full transition-all duration-200 hover:scale-105 cursor-pointer"
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">Error:</p>
                <p className="text-red-600">{result.error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
