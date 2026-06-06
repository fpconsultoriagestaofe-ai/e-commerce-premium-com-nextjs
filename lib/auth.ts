import "server-only"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

const SESSION_COOKIE = "modvo_session"

export interface SessionUser {
  id: string
  email: string
  name: string | null
  role: "ADMIN" | "CUSTOMER"
}

export async function createSession(userId: string) {
  const cookieStore = await cookies()
  // Sessão simples baseada no id do usuário. Em produção use JWT assinado/iron-session.
  cookieStore.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const userId = cookieStore.get(SESSION_COOKIE)?.value
  if (!userId) return null

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true },
  })
  return user
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }
  return user
}
