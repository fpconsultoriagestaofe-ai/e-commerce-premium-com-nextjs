"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, User } from './data'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, size: string, color: string) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, color) => {
        const items = get().items
        const existingItem = items.find(
          item => item.product.id === product.id && item.size === size && item.color === color
        )

        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id && item.size === size && item.color === color
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({ items: [...items, { product, size, color, quantity: 1 }] })
        }
      },
      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            item => !(item.product.id === productId && item.size === size && item.color === color)
          ),
        })
      },
      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color)
          return
        }
        set({
          items: get().items.map(item =>
            item.product.id === productId && item.size === size && item.color === color
              ? { ...item, quantity }
              : item
          ),
        })
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    }),
    {
      name: 'modvo-cart',
    }
  )
)

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'modvo-auth',
    }
  )
)
