"use client"

import { Package, FolderTree, ShoppingCart, TrendingUp } from "lucide-react"
import { products, categories } from "@/lib/data"
import { formatPrice } from "@/lib/data"

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total de Produtos",
      value: products.length.toString(),
      icon: Package,
      change: "+12%",
    },
    {
      label: "Categorias",
      value: categories.length.toString(),
      icon: FolderTree,
      change: "0%",
    },
    {
      label: "Pedidos Hoje",
      value: "24",
      icon: ShoppingCart,
      change: "+8%",
    },
    {
      label: "Receita do Mes",
      value: formatPrice(45890),
      icon: TrendingUp,
      change: "+23%",
    },
  ]

  const recentProducts = products.slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-light tracking-[0.15em]">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visao geral do seu e-commerce</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-background p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-green-600 font-medium">{stat.change}</span>
            </div>
            <p className="text-2xl font-medium">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-background border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="font-medium">Produtos Recentes</h2>
        </div>
        <div className="divide-y divide-border">
          {recentProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 bg-secondary bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.images[0]})` }}
                />
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.stock} em estoque
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{formatPrice(product.price)}</p>
                {product.featured && (
                  <span className="text-xs text-muted-foreground">Destaque</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="/admin/produtos/novo"
          className="bg-foreground text-background p-6 hover:bg-foreground/90 transition-colors"
        >
          <Package className="h-6 w-6 mb-4" />
          <p className="font-medium">Novo Produto</p>
          <p className="text-sm text-background/70 mt-1">
            Adicione um novo produto ao catalogo
          </p>
        </a>
        <a
          href="/admin/categorias"
          className="bg-background border border-border p-6 hover:border-foreground transition-colors"
        >
          <FolderTree className="h-6 w-6 mb-4" />
          <p className="font-medium">Gerenciar Categorias</p>
          <p className="text-sm text-muted-foreground mt-1">
            Organize suas categorias e subcategorias
          </p>
        </a>
        <a
          href="/admin/configuracoes"
          className="bg-background border border-border p-6 hover:border-foreground transition-colors"
        >
          <TrendingUp className="h-6 w-6 mb-4" />
          <p className="font-medium">Configuracoes</p>
          <p className="text-sm text-muted-foreground mt-1">
            Ajuste as configuracoes do site
          </p>
        </a>
      </div>
    </div>
  )
}
