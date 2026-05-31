"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/data"
import { useEffect, useState } from "react"

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false)
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  const totalPrice = getTotalPrice()
  const shippingFree = totalPrice >= 299
  const shippingCost = shippingFree ? 0 : 29.90

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] mb-8">
            Carrinho
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-xl font-light tracking-wide mb-4">
                Seu carrinho esta vazio
              </h2>
              <p className="text-muted-foreground mb-8">
                Explore nossa colecao e encontre pecas especiais para voce.
              </p>
              <Link href="/produtos">
                <Button className="h-12 px-8 tracking-widest">
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="border-b border-border pb-4 mb-6 hidden md:grid grid-cols-12 gap-4 text-sm font-medium tracking-wide text-muted-foreground">
                  <div className="col-span-6">Produto</div>
                  <div className="col-span-2 text-center">Quantidade</div>
                  <div className="col-span-2 text-center">Preco</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="border-b border-border pb-6"
                    >
                      <div className="grid grid-cols-12 gap-4 items-start">
                        {/* Product */}
                        <div className="col-span-12 md:col-span-6 flex gap-4">
                          <Link
                            href={`/produto/${item.product.slug}`}
                            className="relative w-24 h-32 flex-shrink-0 bg-secondary"
                          >
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/produto/${item.product.slug}`}
                              className="font-medium text-sm hover:underline underline-offset-4 line-clamp-2"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">
                              Tamanho: {item.size}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Cor: {item.color}
                            </p>
                            <button
                              onClick={() => removeItem(item.product.id, item.size, item.color)}
                              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mt-2 md:hidden"
                            >
                              <X className="h-4 w-4" />
                              Remover
                            </button>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-6 md:col-span-2 flex items-center justify-start md:justify-center">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size,
                                  item.color,
                                  item.quantity - 1
                                )
                              }
                              className="h-9 w-9 flex items-center justify-center hover:bg-secondary transition-colors"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size,
                                  item.color,
                                  item.quantity + 1
                                )
                              }
                              className="h-9 w-9 flex items-center justify-center hover:bg-secondary transition-colors"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-3 md:col-span-2 text-center">
                          <span className="text-sm md:hidden text-muted-foreground">Preco: </span>
                          <span className="text-sm">{formatPrice(item.product.price)}</span>
                        </div>

                        {/* Total */}
                        <div className="col-span-3 md:col-span-2 text-right flex items-center justify-end gap-4">
                          <span className="text-sm font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id, item.size, item.color)}
                            className="hidden md:flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Remover item"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <Link
                    href="/produtos"
                    className="text-sm font-medium tracking-wide hover:underline underline-offset-4"
                  >
                    Continuar Comprando
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary p-6 md:p-8 sticky top-28">
                  <h2 className="text-lg font-medium tracking-wide mb-6">
                    Resumo do Pedido
                  </h2>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span>
                        {shippingFree ? (
                          <span className="text-green-600">Gratis</span>
                        ) : (
                          formatPrice(shippingCost)
                        )}
                      </span>
                    </div>
                    {!shippingFree && (
                      <p className="text-xs text-muted-foreground">
                        Falta {formatPrice(299 - totalPrice)} para frete gratis
                      </p>
                    )}
                    <div className="border-t border-border pt-4 flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span className="text-lg">{formatPrice(totalPrice + shippingCost)}</span>
                    </div>
                  </div>

                  <Button className="w-full h-14 mt-6 tracking-widest">
                    Finalizar Compra
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Frete calculado na finalizacao
                  </p>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center mb-3">
                      Formas de pagamento
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-6 w-10 bg-background border border-border flex items-center justify-center text-[10px] font-medium">
                        VISA
                      </div>
                      <div className="h-6 w-10 bg-background border border-border flex items-center justify-center text-[10px] font-medium">
                        MC
                      </div>
                      <div className="h-6 w-10 bg-background border border-border flex items-center justify-center text-[10px] font-medium">
                        PIX
                      </div>
                      <div className="h-6 w-10 bg-background border border-border flex items-center justify-center text-[10px] font-medium">
                        BOL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
