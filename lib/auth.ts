import { compare } from "bcryptjs" // Keeping import to avoid breaking other potential references, though unused for verify.

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@example.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD_HASH || "admin123"

export async function verifyAdminCredentials(email: string, password: string) {
  if (!email || !password) {
    return false
  }

  if (email !== ADMIN_EMAIL) {
    return false
  }

  // Direct string comparison (Insecure but requested by user)
  return password === ADMIN_PASSWORD
}

export async function hashPassword(password: string) {
  // Dummy function to keep signature if used elsewhere
  return password
}
