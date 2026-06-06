import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/queries"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: Promise<{ categoria: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    categoria: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoria } = await params
  const category = await getCategoryBySlug(categoria)

  if (!category) {
    notFound()
  }

  const categoryProducts = await getProductsByCategory(categoria)

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
            <span className="text-foreground">{category.name}</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-center">
            {category.name}
          </h1>
        </div>

        {/* Subcategories */}
        {category.subcategories.length > 0 && (
          <div className="container mx-auto px-4 pb-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/produtos/${category.slug}`}
                className="px-4 py-2 text-sm font-medium tracking-wide border border-foreground bg-foreground text-background"
              >
                Todos
              </Link>
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/produtos/${category.slug}/${sub.slug}`}
                  className="px-4 py-2 text-sm font-medium tracking-wide border border-border hover:border-foreground transition-colors"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                Nenhum produto encontrado nesta categoria.
              </p>
              <Link
                href="/produtos"
                className="inline-block mt-4 text-sm font-medium underline underline-offset-4"
              >
                Ver todos os produtos
              </Link>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="container mx-auto px-4 pb-12 text-center">
          <p className="text-sm text-muted-foreground">
            Exibindo {categoryProducts.length} produtos
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
