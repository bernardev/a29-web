import Link from "next/link"
import { MapPin, BedDouble, Car, Maximize } from "lucide-react"
import type { Imovel } from "@/data/imoveis"

export default function PropertyCard({ imovel }: { imovel: Imovel }) {
  return (
    <Link
      href={`/imoveis/${imovel.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-gray">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url(${imovel.imagens[0] || ""})`,
          }}
        />
        {/* Status Badge */}
        <span className="absolute top-4 left-4 bg-accent text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          {imovel.status}
        </span>
        {/* Type Badge */}
        <span className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full">
          {imovel.tipo}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
          {imovel.nome}
        </h3>

        <div className="flex items-center gap-2 text-text-light text-sm mb-5">
          <MapPin size={15} className="text-accent shrink-0" />
          <span>{imovel.bairro}, {imovel.cidade}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap items-center gap-5 text-text-muted text-sm mb-5 pb-5 border-b border-border">
          {imovel.quartos != null && imovel.quartos > 0 && (
            <div className="flex items-center gap-2">
              <BedDouble size={16} className="text-accent" />
              <span>{imovel.quartos} {imovel.quartos > 1 ? "quartos" : "quarto"}</span>
            </div>
          )}
          {imovel.vagas != null && imovel.vagas > 0 && (
            <div className="flex items-center gap-2">
              <Car size={16} className="text-accent" />
              <span>{imovel.vagas} {imovel.vagas > 1 ? "vagas" : "vaga"}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Maximize size={16} className="text-accent" />
            <span>{imovel.area}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {imovel.precoApartir && (
              <span className="text-text-muted text-[11px] uppercase tracking-wider block">
                A partir de
              </span>
            )}
            <span className="text-accent-dark font-bold text-lg">
              {imovel.preco}
            </span>
          </div>
          <span className="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform">
            Ver detalhes →
          </span>
        </div>
      </div>
    </Link>
  )
}
