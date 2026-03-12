"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Home,
  Star,
  Building2,
  Eye,
} from "lucide-react"

type Imovel = {
  id: string
  slug: string
  nome: string
  tipo: string
  status: string
  bairro: string
  cidade: string
  preco: string
  destaque: boolean
  imagens: string[]
  ordem: number
}

export default function AdminDashboard() {
  const [imoveis, setImoveis] = useState<Imovel[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchImoveis()
  }, [])

  async function fetchImoveis() {
    try {
      const res = await fetch("/api/admin/imoveis")
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      const data = await res.json()
      setImoveis(data)
    } catch {
      console.error("Erro ao carregar imóveis")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string, nome: string) {
    if (!confirm(`Tem certeza que deseja excluir "${nome}"?`)) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/imoveis/${id}`, { method: "DELETE" })
      if (res.ok) {
        setImoveis(imoveis.filter((i) => i.id !== id))
      }
    } catch {
      alert("Erro ao excluir imóvel")
    } finally {
      setDeleting(null)
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 size={24} className="text-[#c9a96e]" />
            <h1 className="text-lg font-semibold">A29 Imóveis - Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-white/60 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
            >
              <Eye size={16} />
              Ver site
            </Link>
            <button
              onClick={handleLogout}
              className="text-white/60 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Imóveis</h2>
            <p className="text-gray-500 text-sm mt-1">
              {imoveis.length} {imoveis.length === 1 ? "imóvel cadastrado" : "imóveis cadastrados"}
            </p>
          </div>
          <Link
            href="/admin/imoveis/novo"
            className="bg-[#c9a96e] hover:bg-[#b8964f] text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Novo Imóvel
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Carregando...</div>
        ) : imoveis.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Home size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Nenhum imóvel cadastrado</p>
            <Link
              href="/admin/imoveis/novo"
              className="text-[#c9a96e] hover:text-[#b8964f] font-medium text-sm"
            >
              Cadastrar primeiro imóvel
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Imóvel
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Destaque
                    </th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {imoveis.map((imovel) => (
                    <tr key={imovel.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            {imovel.imagens[0] && (
                              <img
                                src={imovel.imagens[0]}
                                alt={imovel.nome}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{imovel.nome}</p>
                            <p className="text-gray-400 text-xs">{imovel.bairro}, {imovel.cidade}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{imovel.tipo}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          imovel.status === "Lançamento"
                            ? "bg-blue-50 text-blue-600"
                            : imovel.status === "Em obras"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-green-50 text-green-600"
                        }`}>
                          {imovel.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{imovel.preco}</span>
                      </td>
                      <td className="px-6 py-4">
                        {imovel.destaque && <Star size={16} className="text-[#c9a96e] fill-[#c9a96e]" />}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/imoveis/${imovel.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Ver no site"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            href={`/admin/imoveis/${imovel.id}/editar`}
                            className="p-2 text-gray-400 hover:text-[#c9a96e] transition-colors"
                            title="Editar"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(imovel.id, imovel.nome)}
                            disabled={deleting === imovel.id}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
