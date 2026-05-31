"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categories } from "@/lib/data"

export default function NewProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    categoryId: "",
    subcategoryId: "",
    stock: "",
    featured: false,
    new: true,
  })
  const [images, setImages] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>(["P", "M", "G"])
  const [colors, setColors] = useState<{ name: string; hex: string }[]>([
    { name: "Preto", hex: "#000000" },
  ])
  const [newSize, setNewSize] = useState("")
  const [newColor, setNewColor] = useState({ name: "", hex: "#000000" })

  const selectedCategory = categories.find((c) => c.id === formData.categoryId)

  const handleImageUpload = () => {
    // Simulacao de upload - adiciona imagem placeholder
    const placeholderImages = [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    ]
    const randomImage =
      placeholderImages[Math.floor(Math.random() * placeholderImages.length)]
    setImages([...images, randomImage])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      setSizes([...sizes, newSize])
      setNewSize("")
    }
  }

  const removeSize = (size: string) => {
    setSizes(sizes.filter((s) => s !== size))
  }

  const addColor = () => {
    if (newColor.name && !colors.find((c) => c.name === newColor.name)) {
      setColors([...colors, newColor])
      setNewColor({ name: "", hex: "#000000" })
    }
  }

  const removeColor = (colorName: string) => {
    setColors(colors.filter((c) => c.name !== colorName))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulacao de salvamento
    console.log({
      ...formData,
      images,
      sizes,
      colors,
    })
    router.push("/admin/produtos")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/produtos"
          className="h-10 w-10 flex items-center justify-center border border-border hover:border-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.15em]">
            Novo Produto
          </h1>
          <p className="text-muted-foreground mt-1">
            Preencha as informacoes do produto
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <div className="bg-background border border-border p-6">
              <h2 className="font-medium mb-6">Informacoes Basicas</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Nome do Produto *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-2"
                    placeholder="Ex: Camiseta Essencial Pima"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Descricao *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="mt-2 w-full min-h-[120px] px-3 py-2 border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Descreva o produto em detalhes..."
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-background border border-border p-6">
              <h2 className="font-medium mb-6">Imagens</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-[3/4] bg-secondary">
                    <img
                      src={image}
                      alt={`Produto ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center bg-white text-foreground hover:bg-destructive hover:text-white transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 px-2 py-1 bg-foreground text-background text-[10px] font-medium">
                        PRINCIPAL
                      </span>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="aspect-[3/4] border-2 border-dashed border-border hover:border-foreground transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Upload className="h-6 w-6" />
                  <span className="text-xs">Adicionar</span>
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Arraste para reordenar. A primeira imagem sera a principal.
              </p>
            </div>

            {/* Variants */}
            <div className="bg-background border border-border p-6">
              <h2 className="font-medium mb-6">Variantes</h2>
              <div className="space-y-6">
                {/* Sizes */}
                <div>
                  <label className="text-sm font-medium">Tamanhos</label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className="flex items-center gap-1 px-3 py-2 bg-secondary"
                      >
                        <span className="text-sm">{size}</span>
                        <button
                          type="button"
                          onClick={() => removeSize(size)}
                          className="h-4 w-4 flex items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <Input
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                        placeholder="Novo"
                        className="w-20 h-9"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={addSize}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <label className="text-sm font-medium">Cores</label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {colors.map((color) => (
                      <div
                        key={color.name}
                        className="flex items-center gap-2 px-3 py-2 bg-secondary"
                      >
                        <span
                          className="h-4 w-4 border border-border"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-sm">{color.name}</span>
                        <button
                          type="button"
                          onClick={() => removeColor(color.name)}
                          className="h-4 w-4 flex items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="color"
                      value={newColor.hex}
                      onChange={(e) =>
                        setNewColor({ ...newColor, hex: e.target.value })
                      }
                      className="h-9 w-9 border border-input cursor-pointer"
                    />
                    <Input
                      value={newColor.name}
                      onChange={(e) =>
                        setNewColor({ ...newColor, name: e.target.value })
                      }
                      placeholder="Nome da cor"
                      className="w-32 h-9"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={addColor}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Status */}
            <div className="bg-background border border-border p-6">
              <h2 className="font-medium mb-6">Status</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="h-5 w-5"
                  />
                  <span className="text-sm">Produto em destaque</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.new}
                    onChange={(e) =>
                      setFormData({ ...formData, new: e.target.checked })
                    }
                    className="h-5 w-5"
                  />
                  <span className="text-sm">Marcar como novo</span>
                </label>
              </div>
            </div>

            {/* Price */}
            <div className="bg-background border border-border p-6">
              <h2 className="font-medium mb-6">Preco</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Preco de Venda *</label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      R$
                    </span>
                    <Input
                      required
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="pl-10"
                      placeholder="0,00"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Preco Original (opcional)
                  </label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      R$
                    </span>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, originalPrice: e.target.value })
                      }
                      className="pl-10"
                      placeholder="0,00"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Usado para mostrar desconto
                  </p>
                </div>
              </div>
            </div>

            {/* Organization */}
            <div className="bg-background border border-border p-6">
              <h2 className="font-medium mb-6">Organizacao</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Categoria *</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryId: e.target.value,
                        subcategoryId: "",
                      })
                    }
                    className="mt-2 w-full h-10 px-3 border border-input bg-background text-sm"
                  >
                    <option value="">Selecione...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedCategory && selectedCategory.subcategories.length > 0 && (
                  <div>
                    <label className="text-sm font-medium">Subcategoria</label>
                    <select
                      value={formData.subcategoryId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subcategoryId: e.target.value,
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border border-input bg-background text-sm"
                    >
                      <option value="">Selecione...</option>
                      {selectedCategory.subcategories.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium">Estoque *</label>
                  <Input
                    required
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="mt-2"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-8 border-t border-border">
          <Link href="/admin/produtos">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
          <Button type="submit">Salvar Produto</Button>
        </div>
      </form>
    </div>
  )
}
