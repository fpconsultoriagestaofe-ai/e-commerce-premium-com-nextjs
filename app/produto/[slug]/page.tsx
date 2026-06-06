import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { getProductBySlug, getFeaturedProducts } from "@/lib/queries"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const featured = await getFeaturedProducts()
  const relatedProducts = featured.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
      <Footer />
    </div>
  )
}
