import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "African Music Icon Awards | AMI 2026",
  description: "Celebrating Africa's finest musical talent on the world stage",
}

/**
 * Root layout - middleware will redirect to /[lang] routes
 * This layout is minimal since actual rendering happens in [lang]/layout.tsx
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
