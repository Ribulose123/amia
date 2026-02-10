"use client"

import { usePathname, useRouter } from "next/navigation"
import { AMIANavigation } from "@/components/AMIANavigation"
import { Footer } from "@/components/Footer"

export function ClientApp({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  
  // Convert Next.js pathname to page identifier
  const getCurrentPage = () => {
    if (pathname === "/") return "home"
    if (pathname.startsWith("/categories")) return "categories"
    if (pathname.startsWith("/nominees")) return "nominees"
    if (pathname.startsWith("/winners")) return "winners"
    if (pathname.startsWith("/hall-of-fame")) return "hall-of-fame"
    if (pathname.startsWith("/event")) return "event"
    if (pathname.startsWith("/news")) return "news"
    if (pathname.startsWith("/about")) return "about"
    return "home"
  }

  const handleNavigate = (page: string) => {
    const routes: Record<string, string> = {
      home: "/",
      categories: "/categories",
      nominees: "/nominees",
      winners: "/winners",
      "hall-of-fame": "/hall-of-fame",
      event: "/event",
      news: "/news",
      about: "/about",
    }
    router.push(routes[page] || "/")
  }

  return (
    <div className="min-h-screen">
      <AMIANavigation currentPage={getCurrentPage()} onNavigate={handleNavigate} />
      <main>{children}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

