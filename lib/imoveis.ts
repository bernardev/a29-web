import { prisma } from "./prisma"

export type Imovel = {
  id: string
  slug: string
  nome: string
  tipo: string
  status: string
  bairro: string
  cidade: string
  endereco: string | null
  preco: string
  precoApartir: boolean
  area: string
  quartos: number | null
  suites: number | null
  banheiros: number | null
  vagas: number | null
  descricao: string
  destaque: boolean
  construtora: string | null
  entrega: string | null
  diferenciais: string[]
  lazer: string[]
  imagens: string[]
  ordem: number
}

export async function getAllImoveis(): Promise<Imovel[]> {
  return prisma.imovel.findMany({ orderBy: [{ ordem: "asc" }, { createdAt: "desc" }] })
}

export async function getImoveisDestaque(): Promise<Imovel[]> {
  return prisma.imovel.findMany({
    where: { destaque: true },
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
    take: 4,
  })
}

export async function getImovelBySlug(slug: string): Promise<Imovel | null> {
  return prisma.imovel.findUnique({ where: { slug } })
}

export async function getImovelById(id: string): Promise<Imovel | null> {
  return prisma.imovel.findUnique({ where: { id } })
}
