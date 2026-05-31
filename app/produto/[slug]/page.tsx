"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronRight, Minus, Plus, Heart, Share2, ChevronLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getProductBySlug, getFeaturedProducts, formatPrice, type Product } from "@/lib/data"
import { useCartStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const addItem = useCartStore((state) => state.addItem)
  const relatedProducts = getFeaturedProducts().slice(0, 4)

  useEffect(() => {
    async function loadProduct() {
      const resolvedParams = await params
      const foundProduct = getProductBySlug(resolvedParams.slug)
      if (foundProduct) {
        setProduct(foundProduct)
        setSelectedSize(foundProduct.sizes[0] || "")
        setSelectedColor(foundProduct.colors[0]?.name || "")
      }
      setIsLoading(false)
    }
    loadProduct()
  }, [params])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor)
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20 md:pt-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/produtos" className="hover:text-foreground transition-colors">
              Produtos
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </nav>
        </div>

        {/* Product Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center bg-white/80 hover:bg-white transition-colors"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center bg-white/80 hover:bg-white transition-colors"
                      aria-label="Proxima imagem"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                {product.new && (
                  <span className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 text-xs font-medium tracking-wide">
                    Novo
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "relative w-20 h-24 border-2 overflow-hidden",
                        currentImageIndex === index
                          ? "border-foreground"
                          : "border-transparent hover:border-muted-foreground"
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h1 className="text-2xl md:text-3xl font-light tracking-wide">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-xl font-medium">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="mt-6 text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mt-8">
                <label className="text-sm font-medium tracking-wide">
                  Cor: <span className="font-normal text-muted-foreground">{selectedColor}</span>
                </label>
                <div className="flex gap-3 mt-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        "h-10 w-10 border-2 transition-all",
                        selectedColor === color.name
                          ? "border-foreground scale-110"
                          : "border-border hover:border-muted-foreground"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Selecionar cor ${color.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium tracking-wide">Tamanho</label>
                  <button className="text-sm text-muted-foreground underline underline-offset-4">
                    Guia de tamanhos
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-11 min-w-[48px] px-4 border text-sm font-medium tracking-wide transition-colors",
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <label className="text-sm font-medium tracking-wide">Quantidade</label>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-11 w-11 flex items-center justify-center hover:bg-secondary transition-colors"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-11 w-11 flex items-center justify-center hover:bg-secondary transition-colors"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} em estoque
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mt-8 flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 h-14 text-sm font-medium tracking-widest"
                  disabled={!selectedSize || !selectedColor}
                >
                  Adicionar ao Carrinho
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Adicionar aos favoritos</span>
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Compartilhar</span>
                </Button>
              </div>

              {/* Delivery Info */}
              <div className="mt-8 pt-8 border-t border-border space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-secondary text-sm font-medium">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-sm">Frete gratis</p>
                    <p className="text-sm text-muted-foreground">Para compras acima de R$ 299</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-secondary text-sm font-medium">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-sm">Trocas e devolucoes</p>
                    <p className="text-sm text-muted-foreground">Ate 30 dias apos a compra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-center mb-12">
              Voce tambem pode gostar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
