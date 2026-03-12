"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import ImovelForm from "@/components/admin/ImovelForm"

export default function EditarImovelPage() {
  const { id } = useParams<{ id: string }>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [imovel, setImovel] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/imoveis/${id}`)
        if (res.status === 401) {
          router.push("/admin/login")
          return
        }
        if (!res.ok) {
          router.push("/admin")
          return
        }
        const data = await res.json()
        setImovel({
          id: data.id,
          nome: data.nome,
          tipo: data.tipo,
          status: data.status,
          bairro: data.bairro,
          cidade: data.cidade,
          endereco: data.endereco || "",
          preco: data.preco,
          precoApartir: data.precoApartir,
          area: data.area,
          quartos: data.quartos?.toString() || "",
          suites: data.suites?.toString() || "",
          banheiros: data.banheiros?.toString() || "",
          vagas: data.vagas?.toString() || "",
          descricao: data.descricao,
          destaque: data.destaque,
          construtora: data.construtora || "",
          entrega: data.entrega || "",
          diferenciais: data.diferenciais || [],
          lazer: data.lazer || [],
          imagens: data.imagens || [],
          ordem: data.ordem?.toString() || "0",
        })
      } catch {
        router.push("/admin")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Carregando...</p>
      </div>
    )
  }

  if (!imovel) return null

  return <ImovelForm initialData={imovel} isEdit />
}
