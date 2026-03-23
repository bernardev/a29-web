import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"

export const metadata = {
  title: "Contato | A29 Imóveis",
  description: "Entre em contato com a A29 Imóveis. Atendimento personalizado para encontrar o imóvel ideal em Curitiba.",
}

export default function ContatoPage() {
  return (
    <>
      <Header />
      <WhatsAppFloat />

      {/* Hero */}
      <section className="bg-[#1a2a6c] pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20 text-center">
          <span className="text-accent text-sm font-semibold uppercase tracking-[0.3em]">
            Fale Conosco
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Contato
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Estamos prontos para atender você. Entre em contato pelo canal de sua preferência.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">
                Como podemos ajudar?
              </h2>
              <p className="text-text-light leading-relaxed mb-10">
                Na A29 Imóveis, cada conversa é o início de uma parceria.
                Conte-nos o que você procura e faremos o melhor para encontrar
                o imóvel ideal para você.
              </p>

              <div className="space-y-6">
                <a
                  href="https://wa.me/5541996595055"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-border hover:border-accent hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-whatsapp/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={22} className="text-whatsapp" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary group-hover:text-accent transition-colors">
                      WhatsApp
                    </p>
                    <p className="text-text-muted text-sm">(41) 99659-5055</p>
                  </div>
                </a>

                <a
                  href="mailto:contato@a29imoveis.com.br"
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-border hover:border-accent hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={22} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary group-hover:text-accent transition-colors">
                      E-mail
                    </p>
                    <p className="text-text-muted text-sm">contato@a29imoveis.com.br</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/a29imoveis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-border hover:border-accent hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                    <Instagram size={22} className="text-pink-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary group-hover:text-accent transition-colors">
                      Instagram
                    </p>
                    <p className="text-text-muted text-sm">@a29imoveis</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-border">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={22} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Localização</p>
                    <p className="text-text-muted text-sm">Curitiba, Paraná</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-border">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={22} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Horário</p>
                    <p className="text-text-muted text-sm">Seg - Sex: 9h às 18h | Sáb: 9h às 13h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-border shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Envie sua mensagem
              </h3>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Nome</label>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    className="w-full px-5 py-3.5 rounded-xl border border-border bg-cream/50 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Telefone</label>
                  <input
                    type="tel"
                    placeholder="(41) 99999-9999"
                    className="w-full px-5 py-3.5 rounded-xl border border-border bg-cream/50 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">E-mail</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full px-5 py-3.5 rounded-xl border border-border bg-cream/50 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Interesse</label>
                  <select className="w-full px-5 py-3.5 rounded-xl border border-border bg-cream/50 text-sm text-text-light focus:outline-none focus:border-accent transition-colors">
                    <option value="">Selecione o empreendimento</option>
                    <option value="paseo-avila">Paseo de Ávila</option>
                    <option value="paseo-santiago">Paseo Santiago</option>
                    <option value="meo-neoville">Meo Neoville</option>
                    <option value="vega-neoville">Vega Neoville</option>
                    <option value="equi">Équi</option>
                    <option value="door-7710">Door 7710</option>
                    <option value="pine-blue">Pine Blue</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Mensagem</label>
                  <textarea
                    rows={4}
                    placeholder="Conte-nos o que você procura..."
                    className="w-full px-5 py-3.5 rounded-xl border border-border bg-cream/50 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-full font-semibold transition-colors text-base"
                >
                  Enviar mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
