import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/lib/data"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function ProductsPage() {
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
            <span className="text-foreground">Todos os Produtos</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-center">
            Todos os Produtos
          </h1>
          <p className="text-muted-foreground text-center mt-4 max-w-xl mx-auto">
            Explore nossa colecao completa de pecas atemporais
          </p>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/produtos"
              className="px-4 py-2 text-sm font-medium tracking-wide border border-foreground bg-foreground text-background"
            >
              Todos
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/produtos/${category.slug}`}
                className="px-4 py-2 text-sm font-medium tracking-wide border border-border hover:border-foreground transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="container mx-auto px-4 pb-12 text-center">
          <p className="text-sm text-muted-foreground">
            Exibindo {products.length} produtos
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
