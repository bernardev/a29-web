import Link from "next/link"
import { MapPin, Phone, Mail, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1a2a6c] text-white">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Brand */}
          <div>
            <img
              src="https://khaki-chough-664761.hostingersite.com/wp-content/uploads/2025/11/WhatsApp_Image_2025-10-23_at_14.05.56-removebg-preview.png"
              alt="A29 Imóveis"
              className="h-28 w-auto mb-6"
            />
            <p className="text-white/60 text-sm leading-loose max-w-xs">
              Consultoria imobiliária personalizada em Curitiba e região.
              Seu imóvel ideal com atendimento exclusivo.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-accent font-semibold text-sm uppercase tracking-widest mb-8">
              Navegação
            </h4>
            <nav className="flex flex-col gap-5">
              <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm">
                Início
              </Link>
              <Link href="/imoveis" className="text-white/60 hover:text-white transition-colors text-sm">
                Imóveis
              </Link>
              <Link href="/contato" className="text-white/60 hover:text-white transition-colors text-sm">
                Contato
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-accent font-semibold text-sm uppercase tracking-widest mb-8">
              Contato
            </h4>
            <div className="flex flex-col gap-6">
              <a
                href="https://wa.me/5541996595055"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors text-sm"
              >
                <Phone size={16} className="text-accent shrink-0" />
                (41) 99659-5055
              </a>
              <a
                href="mailto:contato@a29imoveis.com.br"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors text-sm"
              >
                <Mail size={16} className="text-accent shrink-0" />
                contato@a29imoveis.com.br
              </a>
              <div className="flex items-start gap-4 text-white/60 text-sm">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                Curitiba, PR
              </div>
              <a
                href="https://instagram.com/a29imoveis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors text-sm"
              >
                <Instagram size={16} className="text-accent shrink-0" />
                @a29imoveis
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-10 text-center">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} A29 Imóveis. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
