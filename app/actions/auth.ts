"use server"

import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { createSession, destroySession, getCurrentUser } from "@/lib/auth"

export interface AuthResult {
  success: boolean
  error?: string
  role?: "ADMIN" | "CUSTOMER"
}

export async function loginAction(email: string, password: string): Promise<AuthResult> {
  if (!email || !password) {
    return { success: false, error: "Preencha todos os campos" }
  }

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  if (!user) {
    return { success: false, error: "E-mail ou senha invalidos" }
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return { success: false, error: "E-mail ou senha invalidos" }
  }

  await createSession(user.id)
  return { success: true, role: user.role }
}

export async function registerAction(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  if (!name || !email || !password) {
    return { success: false, error: "Preencha todos os campos" }
  }
  if (password.length < 6) {
    return { success: false, error: "A senha deve ter ao menos 6 caracteres" }
  }

  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  if (existing) {
    return { success: false, error: "Este e-mail ja esta cadastrado" }
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: "CUSTOMER",
    },
  })

  await createSession(user.id)
  return { success: true, role: user.role }
}

export async function logoutAction() {
  await destroySession()
}

export async function getSessionUser() {
  return getCurrentUser()
}
