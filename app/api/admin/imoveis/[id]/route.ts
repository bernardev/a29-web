import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const { id } = await params
    const imovel = await prisma.imovel.findUnique({ where: { id } })
    if (!imovel) {
      return NextResponse.json({ error: "Imóvel não encontrado" }, { status: 404 })
    }
    return NextResponse.json(imovel)
  } catch {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const { id } = await params
    const data = await request.json()

    const imovel = await prisma.imovel.update({
      where: { id },
      data: {
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
    revalidatePath(`/imoveis/${imovel.slug}`)

    return NextResponse.json(imovel)
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error)
    return NextResponse.json({ error: "Erro ao atualizar imóvel" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const { id } = await params

    const imovel = await prisma.imovel.delete({ where: { id } })

    revalidatePath("/")
    revalidatePath("/imoveis")
    revalidatePath(`/imoveis/${imovel.slug}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir imóvel:", error)
    return NextResponse.json({ error: "Erro ao excluir imóvel" }, { status: 500 })
  }
}
