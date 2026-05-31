import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { siteSettings, categories } from "@/lib/data"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-[0.3em]">
              MODVO
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              Peças atemporais para um guarda-roupa essencial. Moda minimalista e premium.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">Categorias</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/produtos/${category.slug}`}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">Ajuda</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/ajuda/entregas"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Entregas
                </Link>
              </li>
              <li>
                <Link
                  href="/ajuda/trocas"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link
                  href="/ajuda/faq"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/ajuda/contato"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">Newsletter</h3>
            <p className="text-sm text-background/70 mb-4">
              Receba novidades e ofertas exclusivas.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="bg-transparent border border-background/30 px-4 py-3 text-sm placeholder:text-background/50 focus:outline-none focus:border-background transition-colors"
              />
              <button
                type="submit"
                className="bg-background text-foreground px-4 py-3 text-sm font-medium tracking-wide hover:bg-background/90 transition-colors"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">{siteSettings.footerText}</p>
          <div className="flex items-center gap-4">
            {siteSettings.socialLinks.instagram && (
              <a
                href={siteSettings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/50 hover:text-background transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            )}
            {siteSettings.socialLinks.facebook && (
              <a
                href={siteSettings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/50 hover:text-background transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            )}
            {siteSettings.socialLinks.twitter && (
              <a
                href={siteSettings.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/50 hover:text-background transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
