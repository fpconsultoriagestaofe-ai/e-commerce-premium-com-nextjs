import "server-only"
import { prisma } from "@/lib/prisma"

// Tipos serializados para os componentes cliente
export interface ProductDTO {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  categoryId: string
  subcategoryId?: string
  sizes: string[]
  colors: { name: string; hex: string }[]
  featured: boolean
  new: boolean
  stock: number
}

export interface CategoryDTO {
  id: string
  name: string
  slug: string
  image: string
  featured: boolean
  subcategories: { id: string; name: string; slug: string; categoryId: string }[]
}

// Mapa de cores para hex (apresentação)
const COLOR_HEX: Record<string, string> = {
  Branco: "#FFFFFF",
  Preto: "#000000",
  Cinza: "#6B7280",
  "Cinza Escuro": "#374151",
  "Cinza Mescla": "#9CA3AF",
  "Off White": "#FAF9F6",
  Creme: "#F5F5DC",
  Bege: "#F5F5DC",
  Caqui: "#C3B091",
  Marfim: "#FFFFF0",
}

function colorHex(name: string): string {
  return COLOR_HEX[name] ?? "#9CA3AF"
}

type ProductWithRelations = {
  id: string
  name: string
  slug: string
  description: string | null
  price: { toString(): string }
  comparePrice: { toString(): string } | null
  categoryId: string
  subcategoryId: string | null
  featured: boolean
  isNew: boolean
  stock: number
  images: { url: string; order: number }[]
  variants: { name: string; type: string }[]
}

function toProductDTO(p: ProductWithRelations): ProductDTO {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description ?? "",
    price: Number(p.price),
    originalPrice: p.comparePrice ? Number(p.comparePrice) : undefined,
    images: p.images
      .sort((a, b) => a.order - b.order)
      .map((i) => i.url),
    categoryId: p.categoryId,
    subcategoryId: p.subcategoryId ?? undefined,
    sizes: p.variants.filter((v) => v.type === "SIZE").map((v) => v.name),
    colors: p.variants
      .filter((v) => v.type === "COLOR")
      .map((v) => ({ name: v.name, hex: colorHex(v.name) })),
    featured: p.featured,
    new: p.isNew,
    stock: p.stock,
  }
}

export async function getProducts(): Promise<ProductDTO[]> {
  const products = await prisma.product.findMany({
    where: { active: true },
    include: { images: true, variants: true },
    orderBy: { createdAt: "desc" },
  })
  return products.map(toProductDTO)
}

export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: true, variants: true },
  })
  return product ? toProductDTO(product) : null
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<ProductDTO[]> {
  const products = await prisma.product.findMany({
    where: { active: true, category: { slug: categorySlug } },
    include: { images: true, variants: true },
    orderBy: { createdAt: "desc" },
  })
  return products.map(toProductDTO)
}

export async function getFeaturedProducts(): Promise<ProductDTO[]> {
  const products = await prisma.product.findMany({
    where: { active: true, featured: true },
    include: { images: true, variants: true },
    orderBy: { createdAt: "desc" },
  })
  return products.map(toProductDTO)
}

export async function getNewProducts(): Promise<ProductDTO[]> {
  const products = await prisma.product.findMany({
    where: { active: true, isNew: true },
    include: { images: true, variants: true },
    orderBy: { createdAt: "desc" },
  })
  return products.map(toProductDTO)
}

export async function getCategories(): Promise<CategoryDTO[]> {
  const categories = await prisma.category.findMany({
    include: { subcategories: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  })
  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    image: c.image ?? "",
    featured: c.featured,
    subcategories: c.subcategories.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      categoryId: s.categoryId,
    })),
  }))
}

export async function getFeaturedCategories(): Promise<CategoryDTO[]> {
  const all = await getCategories()
  return all.filter((c) => c.featured)
}

export async function getCategoryBySlug(
  slug: string
): Promise<CategoryDTO | null> {
  const all = await getCategories()
  return all.find((c) => c.slug === slug) ?? null
}

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findFirst()
  return settings
}
