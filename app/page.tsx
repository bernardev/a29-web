import Link from "next/link"
import { ArrowRight, Shield, Handshake, Target, TrendingUp } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import PropertyCard from "@/components/PropertyCard"
import { getImoveisDestaque } from "@/lib/imoveis"

export const dynamic = "force-dynamic"

export default async function Home() {
  const destaques = await getImoveisDestaque()

  return (
    <>
      <Header />
      <WhatsAppFloat />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center py-40">
          <span className="inline-block text-accent text-sm font-semibold uppercase tracking-[0.3em] mb-8">
            Consultoria Imobiliária
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Onde o sonho
            <br />
            <span className="text-accent">vira realidade</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-14 leading-relaxed">
            Na A29 Imóveis, cada atendimento é uma experiência única.
            Ajudamos você a encontrar o imóvel perfeito com consultoria
            personalizada e dedicação exclusiva.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/imoveis"
              className="bg-accent hover:bg-accent-dark text-white px-12 py-5 rounded-full text-base font-semibold transition-colors flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              Ver Imóveis
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/5541996595055?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/30 hover:border-accent text-white hover:text-accent px-12 py-5 rounded-full text-base font-semibold transition-all w-full sm:w-auto text-center"
            >
              Fale Conosco
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-accent rounded-full" />
          </div>
        </div>
      </section>

      {/* Sobre - Anelize Mendes */}
      <section className="py-28 sm:py-36 bg-cream">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative order-2 md:order-1">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-warm-gray shadow-xl">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://khaki-chough-664761.hostingersite.com/wp-content/uploads/2025/11/anelize-corretora.avif')",
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-accent text-sm font-semibold uppercase tracking-[0.3em] block mb-5">
                Quem somos
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-8">
                Experiência e confiança
              </h2>
              <p className="text-text-light leading-relaxed mb-6 text-base">
                À frente da A29 Imóveis, <strong className="text-text">Anelize Mendes</strong> une
                sensibilidade no atendimento e rigor técnico para transformar
                busca em conquista. Sua atuação é marcada por{" "}
                <strong className="text-text">transparência, ética e competência</strong>,
                entendendo o que cada cliente realmente precisa — seja o
                primeiro lar, a troca por um espaço maior ou um investimento
                seguro.
              </p>
              <p className="text-text-light leading-relaxed mb-10 text-base">
                Com domínio do mercado e{" "}
                <strong className="text-text">abordagem personalizada</strong>, Anelize
                conduz cada etapa com clareza: da definição do perfil à análise
                documental e negociação final, garantindo um processo{" "}
                <strong className="text-text">seguro, tranquilo e sem surpresas</strong>.
              </p>
              <a
                href="https://wa.me/5541996595055?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-full font-semibold transition-colors text-base"
              >
                Mude sua qualidade de vida
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Imóveis em Destaque */}
      <section className="py-28 sm:py-36">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
          <div className="text-center mb-20">
            <span className="text-accent text-sm font-semibold uppercase tracking-[0.3em] block mb-5">
              Portfólio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
              Imóveis em Destaque
            </h2>
            <p className="text-text-light max-w-lg mx-auto text-base leading-relaxed">
              Selecionamos os melhores empreendimentos de Curitiba para você.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destaques.slice(0, 4).map((imovel) => (
              <PropertyCard key={imovel.slug} imovel={imovel} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/imoveis"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary-light text-white px-12 py-5 rounded-full text-base font-semibold transition-colors"
            >
              Ver todos os imóveis
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-28 sm:py-36 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
          <div className="text-center mb-20">
            <span className="text-accent text-sm font-semibold uppercase tracking-[0.3em] block mb-5">
              Por que nos escolher
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Nossos Diferenciais
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: Handshake,
                title: "Atendimento Consultivo",
                desc: "Entendemos suas necessidades e oferecemos opções alinhadas ao seu perfil e momento de vida.",
              },
              {
                icon: Shield,
                title: "Segurança Jurídica",
                desc: "Acompanhamento completo da documentação e análise detalhada de cada empreendimento.",
              },
              {
                icon: Target,
                title: "Portfólio Selecionado",
                desc: "Trabalhamos apenas com empreendimentos que atendem aos nossos critérios de qualidade.",
              },
              {
                icon: TrendingUp,
                title: "Valorização",
                desc: "Orientação para investimento inteligente com foco em regiões de alta valorização.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-8 bg-accent/20 rounded-2xl flex items-center justify-center">
                  <item.icon size={32} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-[220px] mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 sm:py-36 bg-accent">
        <div className="max-w-3xl mx-auto px-8 sm:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
            Pronto para encontrar o seu imóvel?
          </h2>
          <p className="text-white/80 text-lg mb-14 max-w-xl mx-auto leading-relaxed">
            Entre em contato e descubra como podemos ajudar você a realizar
            o sonho da casa própria.
          </p>
          <a
            href="https://wa.me/5541996595055?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20um%20im%C3%B3vel."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-accent-dark hover:bg-cream px-12 py-5 rounded-full text-lg font-bold transition-colors"
          >
            Falar no WhatsApp
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}
