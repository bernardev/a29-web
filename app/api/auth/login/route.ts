import { NextRequest, NextResponse } from "next/server"
import { authenticateAdmin, signToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    const admin = await authenticateAdmin(email, password)

    if (!admin) {
      return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 })
    }

    const token = await signToken(admin)

    const response = NextResponse.json({ success: true, admin })
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
