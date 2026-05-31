"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/lib/store"
import { mockUsers } from "@/lib/data"

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (isLogin) {
      // Login mockado
      const user = mockUsers.find((u) => u.email === formData.email)
      if (user && formData.password === "123456") {
        login(user)
        if (user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/conta")
        }
      } else {
        setError("E-mail ou senha invalidos")
      }
    } else {
      // Registro mockado
      if (formData.name && formData.email && formData.password) {
        const newUser = {
          id: Date.now().toString(),
          email: formData.email,
          name: formData.name,
          role: "customer" as const,
        }
        login(newUser)
        router.push("/conta")
      } else {
        setError("Preencha todos os campos")
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <Link href="/" className="text-xl font-bold tracking-[0.3em]">
            MODVO
          </Link>
          <div className="w-16" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em]">
              {isLogin ? "Entrar" : "Criar Conta"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLogin
                ? "Acesse sua conta para continuar"
                : "Crie sua conta e aproveite beneficios exclusivos"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium tracking-wide">Nome</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 h-12"
                  placeholder="Seu nome completo"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium tracking-wide">E-mail</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 h-12"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium tracking-wide">Senha</label>
                {isLogin && (
                  <Link
                    href="/recuperar-senha"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                )}
              </div>
              <div className="relative mt-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 pr-12"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-14 tracking-widest">
              {isLogin ? "Entrar" : "Criar Conta"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Ainda nao tem conta?" : "Ja tem uma conta?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError("")
                }}
                className="font-medium text-foreground hover:underline underline-offset-4"
              >
                {isLogin ? "Criar conta" : "Entrar"}
              </button>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-secondary text-sm">
            <p className="font-medium mb-2">Credenciais de teste:</p>
            <p className="text-muted-foreground">
              Admin: admin@modvo.com / 123456
            </p>
            <p className="text-muted-foreground">
              Cliente: cliente@email.com / 123456
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
