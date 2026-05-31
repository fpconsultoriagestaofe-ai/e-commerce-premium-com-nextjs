// Mock Data for MODVO E-commerce

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  featured: boolean
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  categoryId: string
}

export interface Product {
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

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'admin'
}

export interface SiteSettings {
  siteName: string
  logo: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  heroButtonText: string
  footerText: string
  socialLinks: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
}

export const siteSettings: SiteSettings = {
  siteName: 'MODVO',
  logo: '/logo.svg',
  heroTitle: 'Nova Coleção',
  heroSubtitle: 'Descubra peças atemporais para um guarda-roupa essencial',
  heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
  heroButtonText: 'Explorar',
  footerText: '© 2024 MODVO. Todos os direitos reservados.',
  socialLinks: {
    instagram: 'https://instagram.com/modvo',
    facebook: 'https://facebook.com/modvo',
    twitter: 'https://twitter.com/modvo',
  },
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Masculino',
    slug: 'masculino',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
    featured: true,
    subcategories: [
      { id: '1-1', name: 'Camisetas', slug: 'camisetas', categoryId: '1' },
      { id: '1-2', name: 'Calças', slug: 'calcas', categoryId: '1' },
      { id: '1-3', name: 'Casacos', slug: 'casacos', categoryId: '1' },
      { id: '1-4', name: 'Acessórios', slug: 'acessorios', categoryId: '1' },
    ],
  },
  {
    id: '2',
    name: 'Feminino',
    slug: 'feminino',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    featured: true,
    subcategories: [
      { id: '2-1', name: 'Vestidos', slug: 'vestidos', categoryId: '2' },
      { id: '2-2', name: 'Blusas', slug: 'blusas', categoryId: '2' },
      { id: '2-3', name: 'Calças', slug: 'calcas', categoryId: '2' },
      { id: '2-4', name: 'Acessórios', slug: 'acessorios', categoryId: '2' },
    ],
  },
  {
    id: '3',
    name: 'Essenciais',
    slug: 'essenciais',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    featured: true,
    subcategories: [
      { id: '3-1', name: 'Básicos', slug: 'basicos', categoryId: '3' },
      { id: '3-2', name: 'Loungewear', slug: 'loungewear', categoryId: '3' },
    ],
  },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Camiseta Essencial Pima',
    slug: 'camiseta-essencial-pima',
    description: 'Camiseta confeccionada em algodão pima peruano de alta qualidade. Corte relaxado com acabamento premium. Ideal para composições minimalistas do dia a dia.',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    ],
    categoryId: '1',
    subcategoryId: '1-1',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Branco', hex: '#FFFFFF' },
      { name: 'Preto', hex: '#000000' },
      { name: 'Cinza', hex: '#6B7280' },
    ],
    featured: true,
    new: true,
    stock: 50,
  },
  {
    id: '2',
    name: 'Calça Wide Leg Premium',
    slug: 'calca-wide-leg-premium',
    description: 'Calça wide leg em tecido estruturado com caimento impecável. Cintura alta e pernas amplas para um visual sofisticado e contemporâneo.',
    price: 459,
    originalPrice: 559,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=80',
    ],
    categoryId: '2',
    subcategoryId: '2-3',
    sizes: ['34', '36', '38', '40', '42', '44'],
    colors: [
      { name: 'Preto', hex: '#000000' },
      { name: 'Creme', hex: '#F5F5DC' },
    ],
    featured: true,
    new: false,
    stock: 30,
  },
  {
    id: '3',
    name: 'Blazer Oversized Lã',
    slug: 'blazer-oversized-la',
    description: 'Blazer oversized em mistura de lã premium. Design minimalista com ombros estruturados e corte moderno. Perfeito para ocasiões especiais.',
    price: 1290,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    ],
    categoryId: '2',
    subcategoryId: '2-3',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: [
      { name: 'Cinza Escuro', hex: '#374151' },
      { name: 'Preto', hex: '#000000' },
    ],
    featured: true,
    new: true,
    stock: 15,
  },
  {
    id: '4',
    name: 'Moletom Relaxed Fit',
    slug: 'moletom-relaxed-fit',
    description: 'Moletom em algodão orgânico com interior felpudo. Corte relaxed para máximo conforto. Acabamentos premium e bordado discreto.',
    price: 389,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80',
    ],
    categoryId: '1',
    subcategoryId: '1-1',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Cinza Mescla', hex: '#9CA3AF' },
      { name: 'Preto', hex: '#000000' },
      { name: 'Off White', hex: '#FAF9F6' },
    ],
    featured: true,
    new: false,
    stock: 40,
  },
  {
    id: '5',
    name: 'Vestido Midi Estruturado',
    slug: 'vestido-midi-estruturado',
    description: 'Vestido midi em crepe italiano com estrutura impecável. Design atemporal com linhas clean. Fecho invisível nas costas.',
    price: 789,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
    ],
    categoryId: '2',
    subcategoryId: '2-1',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: [
      { name: 'Preto', hex: '#000000' },
      { name: 'Marfim', hex: '#FFFFF0' },
    ],
    featured: true,
    new: true,
    stock: 20,
  },
  {
    id: '6',
    name: 'Jaqueta Couro Minimal',
    slug: 'jaqueta-couro-minimal',
    description: 'Jaqueta em couro legítimo com design minimalista. Forro em seda e acabamento artesanal. Uma peça atemporal para o guarda-roupa.',
    price: 2490,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80',
    ],
    categoryId: '1',
    subcategoryId: '1-3',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#000000' },
    ],
    featured: true,
    new: false,
    stock: 10,
  },
  {
    id: '7',
    name: 'Calça Cargo Utilitária',
    slug: 'calca-cargo-utilitaria',
    description: 'Calça cargo em algodão resistente com bolsos funcionais. Design contemporâneo com acabamento técnico. Conforto e estilo em uma peça.',
    price: 549,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    ],
    categoryId: '1',
    subcategoryId: '1-2',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Preto', hex: '#000000' },
      { name: 'Caqui', hex: '#C3B091' },
    ],
    featured: false,
    new: true,
    stock: 35,
  },
  {
    id: '8',
    name: 'Camisa Linho Relaxed',
    slug: 'camisa-linho-relaxed',
    description: 'Camisa em linho puro com corte relaxed. Botões de madrepérola e acabamento artesanal. Perfeita para o verão com elegância.',
    price: 429,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
    ],
    categoryId: '1',
    subcategoryId: '1-1',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Branco', hex: '#FFFFFF' },
      { name: 'Bege', hex: '#F5F5DC' },
    ],
    featured: false,
    new: false,
    stock: 25,
  },
]

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@modvo.com',
    name: 'Administrador',
    role: 'admin',
  },
  {
    id: '2',
    email: 'cliente@email.com',
    name: 'Cliente Teste',
    role: 'customer',
  },
]

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = categories.find(c => c.slug === categorySlug)
  if (!category) return []
  return products.filter(p => p.categoryId === category.id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.new)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function getFeaturedCategories(): Category[] {
  return categories.filter(c => c.featured)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}
