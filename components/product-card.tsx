"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Product, formatPrice } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const hasMultipleImages = product.images.length > 1

  return (
    <Link
      href={`/produto/${product.slug}`}
      className="group block"
      onMouseEnter={() => {
        setIsHovered(true)
        if (hasMultipleImages) setImageIndex(1)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setImageIndex(0)
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <Image
          src={product.images[imageIndex]}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-all duration-700",
            isHovered ? "scale-105" : "scale-100"
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.new && (
          <span className="absolute top-3 left-3 bg-foreground text-background px-2 py-1 text-xs font-medium tracking-wide">
            Novo
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-foreground text-background px-2 py-1 text-xs font-medium tracking-wide">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>
      <div className="mt-3 md:mt-4">
        <h3 className="text-sm font-medium tracking-wide line-clamp-1 group-hover:underline underline-offset-4">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        {product.colors.length > 1 && (
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                className="h-3 w-3 border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
