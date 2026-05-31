"use client"

import { useState } from "react"
import { Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteSettings } from "@/lib/data"

export default function SettingsPage() {
  const [settings, setSettings] = useState(siteSettings)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Simulacao de salvamento
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.15em]">
            Configuracoes
          </h1>
          <p className="text-muted-foreground mt-1">Configuracoes gerais do site</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          {saved ? "Salvo!" : "Salvar"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="bg-background border border-border p-6">
          <h2 className="font-medium mb-6">Informacoes Gerais</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Nome do Site</label>
              <Input
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Logo</label>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-16 w-32 bg-secondary flex items-center justify-center text-xl font-bold tracking-[0.2em]">
                  MODVO
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Alterar
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Texto do Rodape</label>
              <Input
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Hero Settings */}
        <div className="bg-background border border-border p-6">
          <h2 className="font-medium mb-6">Banner Principal</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Titulo</label>
              <Input
                value={settings.heroTitle}
                onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitulo</label>
              <Input
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Texto do Botao</label>
              <Input
                value={settings.heroButtonText}
                onChange={(e) => setSettings({ ...settings, heroButtonText: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Imagem de Fundo</label>
              <div className="mt-2">
                <div
                  className="h-32 bg-cover bg-center border border-border"
                  style={{ backgroundImage: `url(${settings.heroImage})` }}
                />
                <Button variant="outline" size="sm" className="mt-2 gap-2">
                  <Upload className="h-4 w-4" />
                  Alterar Imagem
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-background border border-border p-6">
          <h2 className="font-medium mb-6">Redes Sociais</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Instagram</label>
              <Input
                value={settings.socialLinks.instagram || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                className="mt-2"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Facebook</label>
              <Input
                value={settings.socialLinks.facebook || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
                className="mt-2"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Twitter</label>
              <Input
                value={settings.socialLinks.twitter || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                  })
                }
                className="mt-2"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-background border border-border p-6">
          <h2 className="font-medium mb-6">SEO</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Titulo da Pagina</label>
              <Input
                defaultValue="MODVO | Moda Premium"
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Descricao</label>
              <textarea
                defaultValue="Descubra pecas atemporais para um guarda-roupa essencial. Moda minimalista e premium."
                className="mt-2 w-full min-h-[100px] px-3 py-2 border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Palavras-chave</label>
              <Input
                defaultValue="moda, premium, minimalista, roupas, essenciais"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
