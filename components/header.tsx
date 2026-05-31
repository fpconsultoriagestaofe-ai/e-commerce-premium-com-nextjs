"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Search, Menu, X, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useCartStore } from "@/lib/store"
import { categories } from "@/lib/data"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const cartItems = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-11 w-11">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm p-0">
              <SheetTitle className="sr-only">Menu de navegacao</SheetTitle>
              <nav className="flex flex-col h-full">
                <div className="p-6 border-b border-border">
                  <Link href="/" className="text-2xl font-bold tracking-[0.3em]">
                    MODVO
                  </Link>
                </div>
                <div className="flex-1 p-6">
                  <ul className="space-y-6">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/produtos/${category.slug}`}
                          className="text-lg font-medium tracking-wide hover:text-muted-foreground transition-colors"
                        >
                          {category.name}
                        </Link>
                        {category.subcategories.length > 0 && (
                          <ul className="mt-3 ml-4 space-y-2">
                            {category.subcategories.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  href={`/produtos/${category.slug}/${sub.slug}`}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 border-t border-border">
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Minha Conta
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/produtos/${category.slug}`}
                className="text-sm font-medium tracking-wide hover:text-muted-foreground transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-bold tracking-[0.3em]"
          >
            MODVO
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-background border border-border p-1">
                  <Input
                    type="search"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 md:w-64 h-9 border-0 focus-visible:ring-0"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery("")
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Fechar busca</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Buscar</span>
                </Button>
              )}
            </div>

            {/* Account */}
            <Link href="/login">
              <Button variant="ghost" size="icon" className="h-11 w-11 hidden md:flex">
                <User className="h-5 w-5" />
                <span className="sr-only">Minha Conta</span>
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/carrinho">
              <Button variant="ghost" size="icon" className="h-11 w-11 relative">
                <ShoppingBag className="h-5 w-5" />
                {isMounted && cartItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center bg-foreground text-background text-xs font-medium">
                    {cartItems}
                  </span>
                )}
                <span className="sr-only">Carrinho</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
