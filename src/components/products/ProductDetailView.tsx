"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "@/stores/toast-store";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RatingStars } from "@/components/ui/RatingStars";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

interface Props {
  product: Product;
}

export function ProductDetailView({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>(
    product.image || product.thumbnail || "",
  );
  const addItem = useCartStore((state) => state.addItem);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("You should be logged in to add items to cart");
      return;
    }
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || product.thumbnail || ""];

  const rate =
    typeof product.rating === "object" && product.rating !== null
      ? product.rating.rate
      : Number(product.rating || 0);

  const count =
    typeof product.rating === "object" && product.rating !== null
      ? product.rating.count
      : product.reviews?.length || 0;

  return (
    <div className="max-w-7xl mx-auto px-margin py-space-lg w-full">
      {/* Breadcrumb Navigation */}
      <div className="mb-space-lg">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: product.title },
          ]}
        />
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-space-lg md:p-space-xl grid grid-cols-1 lg:grid-cols-2 gap-space-xl">
        {/* Left: Product Images */}
        <div className="flex flex-col gap-space-md">
          <div className="relative w-full aspect-square bg-surface-container-low rounded-xl overflow-hidden flex items-center justify-center p-space-lg border border-surface-container">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain w-full h-full"
                priority
              />
            ) : (
              <span className="text-outline text-sm">No Image</span>
            )}
            <span className="absolute top-4 left-4 z-10 text-[11px] leading-[14px] bg-secondary text-on-secondary px-2.5 py-1 rounded font-bold uppercase tracking-wider">
              {product.availabilityStatus || "In Stock"}
            </span>
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-space-sm overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  type="button"
                  className={`relative w-16 h-16 rounded-lg bg-surface-container-low overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImage === img
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-outline-variant"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-between">
          <div className="space-y-space-md">
            <div className="flex items-center justify-between">
              <span className="text-xs bg-primary-fixed text-primary px-3 py-1 rounded-full font-semibold capitalize">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-xs text-on-surface-variant font-medium">
                  Brand:{" "}
                  <strong className="text-on-surface">{product.brand}</strong>
                </span>
              )}
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-on-surface tracking-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-3">
              <RatingStars
                rate={rate}
                count={count}
                size="md"
                countLabel="customer reviews"
              />
              <span className="text-outline-variant">|</span>
              <span className="text-xs text-secondary font-semibold bg-surface-container px-2 py-0.5 rounded">
                Verified Seller
              </span>
            </div>

            <div className="pt-space-sm pb-space-md border-y border-surface-container flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-extrabold text-on-surface">
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercentage && (
                <span className="text-xs font-bold text-secondary bg-secondary-container px-2 py-0.5 rounded-full">
                  {product.discountPercentage}% OFF
                </span>
              )}
              <span className="text-xs text-outline">Taxes included</span>
            </div>

            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-space-sm pt-space-xs text-xs text-on-surface-variant">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <span>
                  {product.shippingInformation || "Free Express Delivery"}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>{product.warrantyInformation || "1-Year Warranty"}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low">
                <RotateCcw className="w-4 h-4 text-primary shrink-0" />
                <span>{product.returnPolicy || "30-Day Money Back"}</span>
              </div>
              {product.sku && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low">
                  <span className="text-outline font-semibold">SKU:</span>
                  <span className="font-mono text-[11px] truncate">
                    {product.sku}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Stepper & Actions */}
          <div className="pt-space-lg mt-space-lg border-t border-surface-container flex flex-col sm:flex-row items-center gap-space-md">
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              size="md"
              className="w-full sm:w-auto justify-between sm:justify-start"
            />

            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full sm:flex-1 py-3 px-space-lg font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all text-sm cursor-pointer ${
                added
                  ? "bg-secondary text-on-secondary"
                  : "bg-primary hover:bg-primary-container text-on-primary"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> Add to Cart ($
                  {(product.price * quantity).toFixed(2)})
                </>
              )}
            </button>

            <Link
              href="/products"
              className="w-full sm:w-auto py-3 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
