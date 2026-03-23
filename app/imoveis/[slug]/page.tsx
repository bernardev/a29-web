import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Car,
  Maximize,
  MapPin,
  Phone,
  CheckCircle,
  Calendar,
  Building2,
  Sparkles,
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import ImageGallery from "@/components/ImageGallery"
import { getImovelBySlug, getAllImoveis } from "@/lib/imoveis"

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const imoveis = await getAllImoveis()
    return imoveis.map((i) => ({ slug: i.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const imovel = await getImovelBySlug(slug)
  if (!imovel) return { title: "Imóvel não encontrado" }
  return {
    title: `${imovel.nome} | A29 Imóveis`,
    description: imovel.descricao,
  }
}

export default async function ImovelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const imovel = await getImovelBySlug(slug)
  if (!imovel) notFound()

  const whatsappMsg = encodeURIComponent(
    `Olá, gostaria de mais informações sobre o ${imovel.nome} no ${imovel.bairro}.`
  )

  return (
    <>
      <Header />
      <WhatsAppFloat />

      {/* Back + Breadcrumb */}
      <div className="bg-[#1a2a6c] pt-28 pb-6">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
          <Link
            href="/imoveis"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar para imóveis
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <section className="bg-[#1a2a6c] pb-8">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
          <ImageGallery images={imovel.imagens} nome={imovel.nome} />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full uppercase">
                    {imovel.status}
                  </span>
                  <span className="bg-primary/5 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    {imovel.tipo}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3">
                  {imovel.nome}
                </h1>
                <div className="flex items-center gap-2 text-text-light">
                  <MapPin size={18} className="text-accent shrink-0" />
                  <span>{imovel.endereco || `${imovel.bairro}, ${imovel.cidade}`}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-text-muted">
                  {imovel.construtora && (
                    <div className="flex items-center gap-1.5">
                      <Building2 size={15} className="text-accent" />
                      <span>{imovel.construtora}</span>
                    </div>
                  )}
                  {imovel.entrega && (
                    <div className="flex items-center gap-1.5">
                      <Calendar size={15} className="text-accent" />
                      <span>Entrega: {imovel.entrega}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 p-8 bg-cream rounded-2xl">
                {imovel.quartos != null && (
                  <div className="text-center">
                    <BedDouble size={24} className="text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{imovel.quartos}</p>
                    <p className="text-text-muted text-xs uppercase tracking-wider">Quartos</p>
                  </div>
                )}
                {imovel.banheiros != null && (
                  <div className="text-center">
                    <Bath size={24} className="text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{imovel.banheiros}</p>
                    <p className="text-text-muted text-xs uppercase tracking-wider">Banheiros</p>
                  </div>
                )}
                {imovel.vagas != null && (
                  <div className="text-center">
                    <Car size={24} className="text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{imovel.vagas}</p>
                    <p className="text-text-muted text-xs uppercase tracking-wider">Vagas</p>
                  </div>
                )}
                <div className="text-center">
                  <Maximize size={24} className="text-accent mx-auto mb-2" />
                  <p className="text-lg font-bold text-primary leading-tight">{imovel.area}</p>
                  <p className="text-text-muted text-xs uppercase tracking-wider">Tipologia</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-primary mb-4">Sobre o empreendimento</h2>
                <p className="text-text-light leading-relaxed text-lg">{imovel.descricao}</p>
              </div>

              {/* Diferenciais do Apartamento */}
              {imovel.diferenciais && imovel.diferenciais.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Diferenciais do Apartamento
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {imovel.diferenciais.map((d) => (
                      <div key={d} className="flex items-center gap-3 p-3 bg-cream rounded-xl">
                        <CheckCircle size={20} className="text-accent shrink-0" />
                        <span className="text-text text-sm">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lazer / Áreas Comuns */}
              {imovel.lazer && imovel.lazer.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Lazer e Áreas Comuns
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {imovel.lazer.map((item) => (
                      <div key={item} className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                        <Sparkles size={18} className="text-accent shrink-0" />
                        <span className="text-text text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white border border-border rounded-2xl p-8 shadow-sm">
                {/* Price */}
                <div className="mb-6 pb-6 border-b border-border">
                  {imovel.precoApartir && (
                    <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                      A partir de
                    </p>
                  )}
                  {!imovel.precoApartir && (
                    <p className="text-text-muted text-sm mb-1">Valor</p>
                  )}
                  <p className="text-3xl font-bold text-accent-dark">{imovel.preco}</p>
                </div>

                {/* Quick Info */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Tipo</span>
                    <span className="font-medium">{imovel.tipo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Tipologia</span>
                    <span className="font-medium">{imovel.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Status</span>
                    <span className="font-medium">{imovel.status}</span>
                  </div>
                  {imovel.entrega && (
                    <div className="flex justify-between">
                      <span className="text-text-muted">Entrega</span>
                      <span className="font-medium">{imovel.entrega}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-text-muted">Localização</span>
                    <span className="font-medium">{imovel.bairro}</span>
                  </div>
                  {imovel.construtora && (
                    <div className="flex justify-between">
                      <span className="text-text-muted">Construtora</span>
                      <span className="font-medium">{imovel.construtora}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/5541996595055?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white py-4 rounded-full font-semibold transition-colors w-full mb-3"
                >
                  <Phone size={18} />
                  Falar no WhatsApp
                </a>
                <Link
                  href="/contato"
                  className="flex items-center justify-center gap-2 border-2 border-primary hover:bg-primary hover:text-white text-primary py-4 rounded-full font-semibold transition-colors w-full"
                >
                  Agendar Visita
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
