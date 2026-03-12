"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import Link from "next/link"
import ImageUploader from "./ImageUploader"

type ImovelData = {
  id?: string
  nome: string
  tipo: string
  status: string
  bairro: string
  cidade: string
  endereco: string
  preco: string
  precoApartir: boolean
  area: string
  quartos: string
  suites: string
  banheiros: string
  vagas: string
  descricao: string
  destaque: boolean
  construtora: string
  entrega: string
  diferenciais: string[]
  lazer: string[]
  imagens: string[]
  ordem: string
}

const TIPOS = ["Apartamento", "Casa", "Sobrado", "Terreno", "Condomínio", "Comercial"]
const STATUS_OPTIONS = ["Lançamento", "Em obras", "Pronto"]

const defaultData: ImovelData = {
  nome: "",
  tipo: "Apartamento",
  status: "Lançamento",
  bairro: "",
  cidade: "Curitiba",
  endereco: "",
  preco: "",
  precoApartir: false,
  area: "",
  quartos: "",
  suites: "",
  banheiros: "",
  vagas: "",
  descricao: "",
  destaque: false,
  construtora: "",
  entrega: "",
  diferenciais: [],
  lazer: [],
  imagens: [],
  ordem: "0",
}

export default function ImovelForm({ initialData, isEdit }: { initialData?: ImovelData; isEdit?: boolean }) {
  const [form, setForm] = useState<ImovelData>(initialData || defaultData)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [newDiferencial, setNewDiferencial] = useState("")
  const [newLazer, setNewLazer] = useState("")
  const router = useRouter()

  function updateField(field: keyof ImovelData, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function addDiferencial() {
    if (!newDiferencial.trim()) return
    updateField("diferenciais", [...form.diferenciais, newDiferencial.trim()])
    setNewDiferencial("")
  }

  function removeDiferencial(i: number) {
    updateField("diferenciais", form.diferenciais.filter((_, idx) => idx !== i))
  }

  function addLazer() {
    if (!newLazer.trim()) return
    updateField("lazer", [...form.lazer, newLazer.trim()])
    setNewLazer("")
  }

  function removeLazer(i: number) {
    updateField("lazer", form.lazer.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSaving(true)

    if (!form.nome || !form.bairro || !form.preco || !form.descricao) {
      setError("Preencha os campos obrigatórios: Nome, Bairro, Preço e Descrição")
      setSaving(false)
      return
    }

    try {
      const url = isEdit ? `/api/admin/imoveis/${form.id}` : "/api/admin/imoveis"
      const method = isEdit ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Erro ao salvar")
      }

      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar imóvel")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0a1628] text-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} />
            Voltar
          </Link>
          <h1 className="text-lg font-semibold">{isEdit ? "Editar Imóvel" : "Novo Imóvel"}</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome *</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => updateField("nome", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                  placeholder="Ex: Meo Neoville"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipo</label>
                <select
                  value={form.tipo}
                  onChange={(e) => updateField("tipo", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                >
                  {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bairro *</label>
                <input
                  type="text"
                  value={form.bairro}
                  onChange={(e) => updateField("bairro", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cidade</label>
                <input
                  type="text"
                  value={form.cidade}
                  onChange={(e) => updateField("cidade", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Endereço completo</label>
                <input
                  type="text"
                  value={form.endereco}
                  onChange={(e) => updateField("endereco", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                  placeholder="Rua, número - Bairro, Cidade - UF, CEP"
                />
              </div>
            </div>
          </section>

          {/* Preço e Detalhes */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Preço e Detalhes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Preço *</label>
                <input
                  type="text"
                  value={form.preco}
                  onChange={(e) => updateField("preco", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                  placeholder="R$ 500.000"
                  required
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer py-3">
                  <input
                    type="checkbox"
                    checked={form.precoApartir}
                    onChange={(e) => updateField("precoApartir", e.target.checked)}
                    className="w-4 h-4 rounded accent-[#c9a96e]"
                  />
                  <span className="text-sm text-gray-600">A partir de</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipologia / Área</label>
                <input
                  type="text"
                  value={form.area}
                  onChange={(e) => updateField("area", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                  placeholder="2 e 3 quartos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quartos</label>
                <input
                  type="number"
                  value={form.quartos}
                  onChange={(e) => updateField("quartos", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Suítes</label>
                <input
                  type="number"
                  value={form.suites}
                  onChange={(e) => updateField("suites", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Banheiros</label>
                <input
                  type="number"
                  value={form.banheiros}
                  onChange={(e) => updateField("banheiros", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Vagas</label>
                <input
                  type="number"
                  value={form.vagas}
                  onChange={(e) => updateField("vagas", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Construtora</label>
                <input
                  type="text"
                  value={form.construtora}
                  onChange={(e) => updateField("construtora", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Entrega</label>
                <input
                  type="text"
                  value={form.entrega}
                  onChange={(e) => updateField("entrega", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                  placeholder="Agosto de 2026"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ordem</label>
                <input
                  type="number"
                  value={form.ordem}
                  onChange={(e) => updateField("ordem", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer py-3">
                  <input
                    type="checkbox"
                    checked={form.destaque}
                    onChange={(e) => updateField("destaque", e.target.checked)}
                    className="w-4 h-4 rounded accent-[#c9a96e]"
                  />
                  <span className="text-sm text-gray-600">Imóvel em destaque</span>
                </label>
              </div>
            </div>
          </section>

          {/* Descrição */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Descrição</h2>
            <textarea
              value={form.descricao}
              onChange={(e) => updateField("descricao", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e] resize-y"
              placeholder="Descrição detalhada do imóvel..."
              required
            />
          </section>

          {/* Imagens */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <ImageUploader images={form.imagens} onChange={(imgs) => updateField("imagens", imgs)} />
          </section>

          {/* Diferenciais */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Diferenciais do Imóvel</h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newDiferencial}
                onChange={(e) => setNewDiferencial(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                placeholder="Ex: Cozinha integrada à sala"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDiferencial())}
              />
              <button
                type="button"
                onClick={addDiferencial}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.diferenciais.map((d, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full">
                  {d}
                  <button type="button" onClick={() => removeDiferencial(i)} className="text-gray-400 hover:text-red-500">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* Lazer */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Lazer e Áreas Comuns</h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newLazer}
                onChange={(e) => setNewLazer(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
                placeholder="Ex: Piscina adulto e infantil"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLazer())}
              />
              <button
                type="button"
                onClick={addLazer}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.lazer.map((l, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-full">
                  {l}
                  <button type="button" onClick={() => removeLazer(i)} className="text-blue-400 hover:text-red-500">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <Link
              href="/admin"
              className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-[#c9a96e] hover:bg-[#b8964f] disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              {saving ? "Salvando..." : isEdit ? "Salvar Alterações" : "Cadastrar Imóvel"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
