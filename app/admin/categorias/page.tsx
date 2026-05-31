"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight, Star, StarOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categories as initialCategories, type Category, type Subcategory } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingSubcategory, setEditingSubcategory] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newSubcategoryName, setNewSubcategoryName] = useState("")
  const [addingSubcategoryTo, setAddingSubcategoryTo] = useState<string | null>(null)
  const [showNewCategory, setShowNewCategory] = useState(false)

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return
    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      slug: newCategoryName.toLowerCase().replace(/\s+/g, "-"),
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
      featured: false,
      subcategories: [],
    }
    setCategories([...categories, newCategory])
    setNewCategoryName("")
    setShowNewCategory(false)
  }

  const handleAddSubcategory = (categoryId: string) => {
    if (!newSubcategoryName.trim()) return
    const newSubcategory: Subcategory = {
      id: `${categoryId}-${Date.now()}`,
      name: newSubcategoryName,
      slug: newSubcategoryName.toLowerCase().replace(/\s+/g, "-"),
      categoryId,
    }
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
          : cat
      )
    )
    setNewSubcategoryName("")
    setAddingSubcategoryTo(null)
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId))
  }

  const handleDeleteSubcategory = (categoryId: string, subcategoryId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.filter((sub) => sub.id !== subcategoryId),
            }
          : cat
      )
    )
  }

  const toggleFeatured = (categoryId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, featured: !cat.featured } : cat
      )
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.15em]">
            Categorias
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie categorias e subcategorias
          </p>
        </div>
        <Button onClick={() => setShowNewCategory(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Categoria
        </Button>
      </div>

      {/* New Category Form */}
      {showNewCategory && (
        <div className="bg-background border border-border p-6">
          <h3 className="font-medium mb-4">Nova Categoria</h3>
          <div className="flex gap-4">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nome da categoria"
              className="flex-1"
            />
            <Button onClick={handleAddCategory}>Adicionar</Button>
            <Button variant="outline" onClick={() => setShowNewCategory(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-background border border-border">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-border last:border-b-0">
            {/* Category Row */}
            <div className="flex items-center gap-4 p-4 hover:bg-secondary/50">
              <button
                onClick={() => toggleExpand(category.id)}
                className="h-8 w-8 flex items-center justify-center hover:bg-secondary"
              >
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              <div
                className="w-12 h-12 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              />

              <div className="flex-1">
                {editingCategory === category.id ? (
                  <Input
                    defaultValue={category.name}
                    className="max-w-xs"
                    autoFocus
                    onBlur={() => setEditingCategory(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setEditingCategory(null)
                      }
                    }}
                  />
                ) : (
                  <p className="font-medium">{category.name}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {category.subcategories.length} subcategorias
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFeatured(category.id)}
                  className={cn(
                    "h-9 w-9 flex items-center justify-center transition-colors",
                    category.featured
                      ? "text-yellow-500"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  title={category.featured ? "Remover destaque" : "Destacar"}
                >
                  {category.featured ? (
                    <Star className="h-4 w-4 fill-current" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => setEditingCategory(category.id)}
                  className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Subcategories */}
            {expandedCategories.includes(category.id) && (
              <div className="bg-secondary/30 border-t border-border">
                {category.subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center gap-4 p-4 pl-16 border-b border-border last:border-b-0"
                  >
                    <div className="flex-1">
                      {editingSubcategory === sub.id ? (
                        <Input
                          defaultValue={sub.name}
                          className="max-w-xs"
                          autoFocus
                          onBlur={() => setEditingSubcategory(null)}
                        />
                      ) : (
                        <p className="text-sm">{sub.name}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingSubcategory(sub.id)}
                        className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubcategory(category.id, sub.id)}
                        className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Subcategory */}
                {addingSubcategoryTo === category.id ? (
                  <div className="flex items-center gap-4 p-4 pl-16">
                    <Input
                      value={newSubcategoryName}
                      onChange={(e) => setNewSubcategoryName(e.target.value)}
                      placeholder="Nome da subcategoria"
                      className="flex-1"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAddSubcategory(category.id)}
                    >
                      Adicionar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setAddingSubcategoryTo(null)}
                    >
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingSubcategoryTo(category.id)}
                    className="flex items-center gap-2 p-4 pl-16 text-sm text-muted-foreground hover:text-foreground w-full text-left"
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar Subcategoria
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
