import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "./context/ThemeContext"
import { LanguageProvider } from "./context/LanguageContext"
import { ClientApp } from "./components/ClientApp"

export const metadata: Metadata = {
  title: "African Music Icon Awards | AMI 2026",
  description: "Celebrating Africa's finest musical talent on the world stage",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen dark:bg-black dark:text-white light:bg-white light:text-black">
        <ThemeProvider>
          <LanguageProvider>
            <ClientApp>{children}</ClientApp>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
