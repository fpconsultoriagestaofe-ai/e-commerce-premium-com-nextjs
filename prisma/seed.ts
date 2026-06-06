import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Iniciando seed...")

  // Limpar dados existentes
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.subcategory.deleteMany()
  await prisma.category.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()
  await prisma.siteSettings.deleteMany()

  // Configurações do site
  await prisma.siteSettings.create({
    data: {
      siteName: "MODVO",
      bannerTitle: "Nova Coleção",
      bannerSubtitle: "Descubra peças atemporais para um guarda-roupa essencial",
      bannerUrl:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
      email: "contato@modvo.com",
      phone: "+55 11 99999-9999",
      instagram: "https://instagram.com/modvo",
      facebook: "https://facebook.com/modvo",
      twitter: "https://twitter.com/modvo",
      metaTitle: "MODVO - Moda Premium",
      metaDescription: "E-commerce premium de moda minimalista",
    },
  })

  // Usuários (senha: 123456)
  const hashedPassword = await bcrypt.hash("123456", 10)

  await prisma.user.create({
    data: {
      email: "admin@modvo.com",
      name: "Administrador",
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  await prisma.user.create({
    data: {
      email: "cliente@email.com",
      name: "Cliente Teste",
      password: hashedPassword,
      role: "CUSTOMER",
    },
  })

  // Categorias
  const masculino = await prisma.category.create({
    data: {
      name: "Masculino",
      slug: "masculino",
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
      featured: true,
      order: 1,
      subcategories: {
        create: [
          { name: "Camisetas", slug: "masculino-camisetas", order: 1 },
          { name: "Calças", slug: "masculino-calcas", order: 2 },
          { name: "Casacos", slug: "masculino-casacos", order: 3 },
          { name: "Acessórios", slug: "masculino-acessorios", order: 4 },
        ],
      },
    },
    include: { subcategories: true },
  })

  const feminino = await prisma.category.create({
    data: {
      name: "Feminino",
      slug: "feminino",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      featured: true,
      order: 2,
      subcategories: {
        create: [
          { name: "Vestidos", slug: "feminino-vestidos", order: 1 },
          { name: "Blusas", slug: "feminino-blusas", order: 2 },
          { name: "Calças", slug: "feminino-calcas", order: 3 },
          { name: "Acessórios", slug: "feminino-acessorios", order: 4 },
        ],
      },
    },
    include: { subcategories: true },
  })

  const essenciais = await prisma.category.create({
    data: {
      name: "Essenciais",
      slug: "essenciais",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
      featured: true,
      order: 3,
      subcategories: {
        create: [
          { name: "Básicos", slug: "essenciais-basicos", order: 1 },
          { name: "Loungewear", slug: "essenciais-loungewear", order: 2 },
        ],
      },
    },
    include: { subcategories: true },
  })

  const products = [
    {
      name: "Camiseta Essencial Pima",
      slug: "camiseta-essencial-pima",
      description:
        "Camiseta confeccionada em algodão pima peruano de alta qualidade. Corte relaxado com acabamento premium.",
      price: 189,
      categoryId: masculino.id,
      subcategoryId: masculino.subcategories[0].id,
      featured: true,
      isNew: true,
      stock: 50,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      ],
      sizes: ["PP", "P", "M", "G", "GG"],
      colors: ["Branco", "Preto", "Cinza"],
    },
    {
      name: "Calça Wide Leg Premium",
      slug: "calca-wide-leg-premium",
      description:
        "Calça wide leg em tecido estruturado com caimento impecável. Cintura alta e pernas amplas.",
      price: 459,
      comparePrice: 559,
      categoryId: feminino.id,
      subcategoryId: feminino.subcategories[2].id,
      featured: true,
      isNew: false,
      stock: 30,
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
        "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=80",
      ],
      sizes: ["34", "36", "38", "40", "42", "44"],
      colors: ["Preto", "Creme"],
    },
    {
      name: "Blazer Oversized Lã",
      slug: "blazer-oversized-la",
      description:
        "Blazer oversized em mistura de lã premium. Design minimalista com ombros estruturados.",
      price: 1290,
      categoryId: feminino.id,
      subcategoryId: feminino.subcategories[2].id,
      featured: true,
      isNew: true,
      stock: 15,
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      ],
      sizes: ["PP", "P", "M", "G"],
      colors: ["Cinza Escuro", "Preto"],
    },
    {
      name: "Moletom Relaxed Fit",
      slug: "moletom-relaxed-fit",
      description:
        "Moletom em algodão orgânico com interior felpudo. Corte relaxed para máximo conforto.",
      price: 389,
      categoryId: masculino.id,
      subcategoryId: masculino.subcategories[0].id,
      featured: true,
      isNew: false,
      stock: 40,
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
        "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80",
      ],
      sizes: ["P", "M", "G", "GG"],
      colors: ["Cinza Mescla", "Preto", "Off White"],
    },
    {
      name: "Vestido Midi Estruturado",
      slug: "vestido-midi-estruturado",
      description:
        "Vestido midi em crepe italiano com estrutura impecável. Design atemporal com linhas clean.",
      price: 789,
      categoryId: feminino.id,
      subcategoryId: feminino.subcategories[0].id,
      featured: true,
      isNew: true,
      stock: 20,
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
      ],
      sizes: ["PP", "P", "M", "G"],
      colors: ["Preto", "Marfim"],
    },
    {
      name: "Jaqueta Couro Minimal",
      slug: "jaqueta-couro-minimal",
      description:
        "Jaqueta em couro legítimo com design minimalista. Forro em seda e acabamento artesanal.",
      price: 2490,
      categoryId: masculino.id,
      subcategoryId: masculino.subcategories[2].id,
      featured: true,
      isNew: false,
      stock: 10,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
        "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80",
      ],
      sizes: ["P", "M", "G", "GG"],
      colors: ["Preto"],
    },
    {
      name: "Calça Cargo Utilitária",
      slug: "calca-cargo-utilitaria",
      description:
        "Calça cargo em algodão resistente com bolsos funcionais. Design contemporâneo.",
      price: 549,
      categoryId: masculino.id,
      subcategoryId: masculino.subcategories[1].id,
      featured: false,
      isNew: true,
      stock: 35,
      images: [
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      ],
      sizes: ["38", "40", "42", "44", "46"],
      colors: ["Preto", "Caqui"],
    },
    {
      name: "Camisa Linho Relaxed",
      slug: "camisa-linho-relaxed",
      description:
        "Camisa em linho puro com corte relaxed. Botões de madrepérola e acabamento artesanal.",
      price: 429,
      categoryId: masculino.id,
      subcategoryId: masculino.subcategories[0].id,
      featured: false,
      isNew: false,
      stock: 25,
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
      ],
      sizes: ["P", "M", "G", "GG"],
      colors: ["Branco", "Bege"],
    },
  ]

  for (const p of products) {
    const { images, sizes, colors, ...productData } = p
    await prisma.product.create({
      data: {
        ...productData,
        images: {
          create: images.map((url, i) => ({ url, order: i })),
        },
        variants: {
          create: [
            ...sizes.map((name) => ({ name, type: "SIZE" as const })),
            ...colors.map((name) => ({ name, type: "COLOR" as const })),
          ],
        },
      },
    })
  }

  console.log("Seed concluído com sucesso!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
