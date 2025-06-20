"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

interface CartSidebarProps {
  onCheckout: () => void;
}

export function CartSidebar({ onCheckout }: CartSidebarProps) {
  const { state, dispatch } = useCart();
  const [open, setOpen] = useState<boolean>(false);

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const handleCheckout = () => {
    setOpen(false);
    onCheckout();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart
          {state.itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs animate-pulse cursor-pointer"
            >
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="space-y-2">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart
          </SheetTitle>
          <SheetDescription>
            {state.itemCount === 0
              ? "Your cart is empty"
              : `${state.itemCount} item${
                  state.itemCount > 1 ? "s" : ""
                } in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 mt-6">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 text-sm">
                Add some products to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <ScrollArea className="flex-1 max-h-96">
                <div className="space-y-4 pr-4 p-4">
                  {state.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4 p-4 border rounded-lg transition-all duration-200 hover:shadow-sm"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {item.product.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.product.price} USDC each
                        </p>
                        <p className="text-sm font-medium">
                          Total:{" "}
                          {(
                            parseFloat(item.product.price) * item.quantity
                          ).toFixed(3)}{" "}
                          USDC
                        </p>
                      </div>

                      <div className="flex items-center gap-2 ">
                        <div className="flex items-center gap-1 border rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="h-8 w-8 p-0 hover:bg-gray-100 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="h-8 w-8 p-0 hover:bg-gray-100 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="space-y-4 border-t pt-4 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">
                      {state.total.toFixed(3)} USDC
                    </span>
                    <p className="text-xs text-muted-foreground">
                      ~${(state.total * 1).toFixed(2)} USD
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
                  size="sm"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
