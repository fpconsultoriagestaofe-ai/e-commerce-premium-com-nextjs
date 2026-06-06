import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { siteSettings } from "@/lib/data"
import { getFeaturedCategories, getFeaturedProducts, getNewProducts, getSiteSettings } from "@/lib/queries"

export default async function HomePage() {
  const [featuredCategories, featuredProducts, newProducts, settings] = await Promise.all([
    getFeaturedCategories(),
    getFeaturedProducts(),
    getNewProducts(),
    getSiteSettings(),
  ])

  const heroImage = settings?.bannerUrl || siteSettings.heroImage
  const heroTitle = settings?.bannerTitle || siteSettings.heroTitle
  const heroSubtitle = settings?.bannerSubtitle || siteSettings.heroSubtitle

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[100svh] flex items-center justify-center">
          <Image
            src={heroImage || "/placeholder.svg"}
            alt="Hero"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] mb-4 text-balance">
              {heroTitle}
            </h1>
            <p className="text-base md:text-lg font-light tracking-wide mb-8 text-white/90">
              {heroSubtitle}
            </p>
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm font-medium tracking-widest hover:bg-white/90 transition-colors"
            >
              {siteSettings.heroButtonText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest animate-bounce">
            SCROLL
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-center mb-12">
              Categorias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {featuredCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/produtos/${category.slug}`}
                  className="group relative aspect-[3/4] md:aspect-[4/5] overflow-hidden"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl md:text-2xl font-light tracking-[0.3em]">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        {newProducts.length > 0 && (
          <section className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em]">
                  Novidades
                </h2>
                <Link
                  href="/produtos?novo=true"
                  className="text-sm font-medium tracking-wide hover:underline underline-offset-4 flex items-center gap-2"
                >
                  Ver Todos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {newProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Editorial Banner */}
        <section className="relative h-[70vh] md:h-[80vh]">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
            alt="Editorial"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <span className="text-xs md:text-sm tracking-[0.4em] text-white/80 mb-4 block">
                ESSENCIAIS
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] mb-6 text-balance">
                Guarda-roupa atemporal
              </h2>
              <Link
                href="/produtos/essenciais"
                className="inline-flex items-center gap-2 border border-white text-white px-8 py-4 text-sm font-medium tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Descobrir
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em]">
                Destaques
              </h2>
              <Link
                href="/produtos"
                className="text-sm font-medium tracking-wide hover:underline underline-offset-4 flex items-center gap-2"
              >
                Ver Todos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs tracking-[0.4em] text-background/60 mb-6 block">
                NOSSA FILOSOFIA
              </span>
              <h2 className="text-2xl md:text-4xl font-light leading-relaxed mb-8 text-pretty">
                &ldquo;Acreditamos em pecas atemporais que transcendem tendencias. 
                Qualidade, simplicidade e design consciente.&rdquo;
              </h2>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-widest hover:underline underline-offset-4"
              >
                Conheca a MODVO
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
