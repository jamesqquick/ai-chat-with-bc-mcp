import React from "react";
import { AlertTriangle } from "lucide-react";
import { ProductList } from "@/vibes/soul/sections/product-list";

type Product = {
  entityId: string;
  name: string;
  defaultImage?: {
    url: string;
  };
};

type ProductSearchResultProps = {
  messageId: string;
  partIndex: number;
  products?: Product[];
};

export function ProductSearchResult({
  messageId,
  partIndex,
  products,
}: ProductSearchResultProps) {
  // Handle case where products exist
  if (products && products.length > 0) {
    const formattedProducts = products.map((product) => ({
      id: product.entityId,
      title: product.name,
      href: "#",
      image: {
        src: product.defaultImage?.url || "",
        alt: product.name,
      },
    }));

    return (
      <ProductList
        key={`${messageId}-${partIndex}`}
        products={formattedProducts}
        showCompare={false}
      />
    );
  }

  // Handle case where no products found
  return (
    <div
      key={`${messageId}-${partIndex}`}
      className="rounded-lg px-4 py-3 bg-yellow-50 border border-yellow-200"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-yellow-800">
            No Products Found
          </p>
          <p className="text-sm text-yellow-700 mt-1">
            The product search didn&apos;t return any results. Try rephrasing
            your search.
          </p>
        </div>
      </div>
    </div>
  );
}
