"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { User, Package, Heart, MapPin, CreditCard, LogOut, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store"

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push("/login")
    }
  }, [isMounted, isAuthenticated, router])

  if (!isMounted || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const menuItems = [
    {
      icon: Package,
      label: "Meus Pedidos",
      description: "Acompanhe seus pedidos",
      href: "/conta/pedidos",
    },
    {
      icon: Heart,
      label: "Lista de Desejos",
      description: "Produtos salvos",
      href: "/conta/favoritos",
    },
    {
      icon: MapPin,
      label: "Enderecos",
      description: "Gerencie seus enderecos",
      href: "/conta/enderecos",
    },
    {
      icon: CreditCard,
      label: "Pagamento",
      description: "Formas de pagamento",
      href: "/conta/pagamento",
    },
    {
      icon: User,
      label: "Dados Pessoais",
      description: "Editar informacoes",
      href: "/conta/dados",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Welcome */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em]">
              Ola, {user.name}
            </h1>
            <p className="text-muted-foreground mt-2">{user.email}</p>
          </div>

          {/* Admin Link */}
          {user.role === "admin" && (
            <Link
              href="/admin"
              className="block mb-8 p-4 bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Painel Administrativo</p>
                  <p className="text-sm text-background/70">
                    Gerencie produtos, categorias e configuracoes
                  </p>
                </div>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>
          )}

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 p-6 border border-border hover:border-foreground transition-colors group"
              >
                <div className="h-12 w-12 flex items-center justify-center bg-secondary group-hover:bg-foreground group-hover:text-background transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="mt-12">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="h-12 px-8"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair da Conta
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
