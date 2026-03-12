"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import PropertyCard from "@/components/PropertyCard"
import type { Imovel } from "@/lib/imoveis"

export default function ImoveisFilter({ imoveis }: { imoveis: Imovel[] }) {
  const [busca, setBusca] = useState("")
  const [tipo, setTipo] = useState("")
  const [cidade, setCidade] = useState("")

  const filtrados = useMemo(() => {
    return imoveis.filter((imovel) => {
      const matchBusca =
        busca === "" ||
        imovel.nome.toLowerCase().includes(busca.toLowerCase()) ||
        imovel.bairro.toLowerCase().includes(busca.toLowerCase()) ||
        imovel.cidade.toLowerCase().includes(busca.toLowerCase())

      const matchTipo = tipo === "" || imovel.tipo === tipo
      const matchCidade = cidade === "" || imovel.cidade === cidade

      return matchBusca && matchTipo && matchCidade
    })
  }, [imoveis, busca, tipo, cidade])

  // Extrair tipos e cidades únicos dos dados reais
  const tipos = [...new Set(imoveis.map((i) => i.tipo))].sort()
  const cidades = [...new Set(imoveis.map((i) => i.cidade))].sort()

  return (
    <>
      {/* Filters Bar */}
      <section className="bg-cream py-5 border-b border-border sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Buscar por nome, bairro ou cidade..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 rounded-full border border-border bg-white text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="px-5 py-3.5 rounded-full border border-border bg-white text-sm text-text-light focus:outline-none focus:border-accent flex-1 sm:flex-none"
              >
                <option value="">Todos os tipos</option>
                {tipos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="px-5 py-3.5 rounded-full border border-border bg-white text-sm text-text-light focus:outline-none focus:border-accent flex-1 sm:flex-none"
              >
                <option value="">Todas as cidades</option>
                {cidades.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-20 bg-cream min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
          <p className="text-text-muted text-sm mb-10">
            {filtrados.length} {filtrados.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
          </p>

          {filtrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filtrados.map((imovel) => (
                <PropertyCard key={imovel.slug} imovel={imovel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg mb-2">Nenhum imóvel encontrado</p>
              <p className="text-text-muted text-sm">
                Tente ajustar os filtros ou{" "}
                <button
                  onClick={() => {
                    setBusca("")
                    setTipo("")
                    setCidade("")
                  }}
                  className="text-accent hover:text-accent-dark underline font-medium"
                >
                  limpar todos
                </button>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
