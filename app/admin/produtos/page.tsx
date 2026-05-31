"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Edit2, Trash2, Star, StarOff, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products as initialProducts, categories, formatPrice, type Product } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      !selectedCategory || product.categoryId === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFeatured = (productId: string) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, featured: !p.featured } : p
      )
    )
  }

  const handleDelete = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.15em]">
            Produtos
          </h1>
          <p className="text-muted-foreground mt-1">
            {products.length} produtos cadastrados
          </p>
        </div>
        <Link href="/admin/produtos/novo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar produtos..."
            className="pl-10"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 pl-10 pr-8 border border-input bg-background text-sm appearance-none cursor-pointer"
          >
            <option value="">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-background border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Produto
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                  Categoria
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Preco
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                  Estoque
                </th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => {
                const category = categories.find(
                  (c) => c.id === product.categoryId
                )
                return (
                  <tr key={product.id} className="hover:bg-secondary/50">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-16 bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${product.images[0]})` }}
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {product.new && (
                              <span className="px-2 py-0.5 bg-foreground text-background text-[10px] font-medium">
                                NOVO
                              </span>
                            )}
                            {product.featured && (
                              <span className="px-2 py-0.5 bg-secondary text-[10px] font-medium">
                                DESTAQUE
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {category?.name || "-"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <span className="text-sm font-medium">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span
                        className={cn(
                          "text-sm",
                          product.stock < 10
                            ? "text-destructive"
                            : "text-muted-foreground"
                        )}
                      >
                        {product.stock} un.
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleFeatured(product.id)}
                          className={cn(
                            "h-9 w-9 flex items-center justify-center transition-colors",
                            product.featured
                              ? "text-yellow-500"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                          title={
                            product.featured ? "Remover destaque" : "Destacar"
                          }
                        >
                          {product.featured ? (
                            <Star className="h-4 w-4 fill-current" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </button>
                        <Link
                          href={`/admin/produtos/${product.id}`}
                          className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
