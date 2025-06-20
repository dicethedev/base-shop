"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Zap } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge
              variant={product.type === "physical" ? "default" : "secondary"}
              className="shadow-sm"
            >
              {product.type === "physical" ? (
                <>
                  <Package className="w-3 h-3 mr-1" />
                  Physical
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 mr-1" />
                  Digital
                </>
              )}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              {product.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {product.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">
              {product.price} USDC
            </span>
            <span className="text-xs text-muted-foreground">
              ~${(parseFloat(product.price) * 1).toFixed(2)} USD
            </span>
          </div>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="transition-all duration-200 hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
