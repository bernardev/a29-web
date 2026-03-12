import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function GET() {
  try {
    await requireAdmin()
    const imoveis = await prisma.imovel.findMany({
      orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
    })
    return NextResponse.json(imoveis)
  } catch {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }
}

function generateSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    const data = await request.json()

    let slug = data.slug || generateSlug(data.nome)

    // Ensure unique slug
    const existing = await prisma.imovel.findUnique({ where: { slug } })
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    const imovel = await prisma.imovel.create({
      data: {
        slug,
        nome: data.nome,
        tipo: data.tipo,
        status: data.status,
        bairro: data.bairro,
        cidade: data.cidade,
        endereco: data.endereco || null,
        preco: data.preco,
        precoApartir: data.precoApartir || false,
        area: data.area,
        quartos: data.quartos ? parseInt(data.quartos) : null,
        suites: data.suites ? parseInt(data.suites) : null,
        banheiros: data.banheiros ? parseInt(data.banheiros) : null,
        vagas: data.vagas ? parseInt(data.vagas) : null,
        descricao: data.descricao,
        destaque: data.destaque || false,
        construtora: data.construtora || null,
        entrega: data.entrega || null,
        diferenciais: data.diferenciais || [],
        lazer: data.lazer || [],
        imagens: data.imagens || [],
        ordem: data.ordem ? parseInt(data.ordem) : 0,
      },
    })

    revalidatePath("/")
    revalidatePath("/imoveis")
    revalidatePath(`/imoveis/${slug}`)

    return NextResponse.json(imovel, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar imóvel:", error)
    return NextResponse.json({ error: "Erro ao criar imóvel" }, { status: 500 })
  }
}
