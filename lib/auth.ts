import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret")

export async function signToken(payload: { id: string; email: string; name: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as { id: string; email: string; name: string }
  } catch {
    return null
  }
}

export async function getAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin-token")?.value
  if (!token) return null
  return verifyToken(token)
}

export async function requireAdmin() {
  const admin = await getAdmin()
  if (!admin) throw new Error("Unauthorized")
  return admin
}

export async function authenticateAdmin(email: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { email } })
  if (!admin) return null

  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) return null

  return { id: admin.id, email: admin.email, name: admin.name }
}
