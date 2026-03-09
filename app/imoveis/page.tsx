import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import ImoveisFilter from "@/components/ImoveisFilter"
import { imoveis } from "@/data/imoveis"

export const metadata = {
  title: "Imóveis | A29 Imóveis",
  description: "Confira todos os imóveis disponíveis na A29 Imóveis. Apartamentos, casas e sobrados em Curitiba e região.",
}

export default function ImoveisPage() {
  return (
    <>
      <Header />
      <WhatsAppFloat />

      {/* Hero */}
      <section className="bg-primary pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20 text-center">
          <span className="text-accent text-sm font-semibold uppercase tracking-[0.3em] block mb-4">
            Nosso Portfólio
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Imóveis
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-base">
            Explore nossos empreendimentos selecionados em Curitiba e região metropolitana.
          </p>
        </div>
      </section>

      <ImoveisFilter imoveis={imoveis} />

      <Footer />
    </>
  )
}
