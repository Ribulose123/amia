"use client"

import { usePathname, useRouter } from "next/navigation"
import { AMIANavigation } from "@/components/AMIANavigation"
import { Footer } from "@/components/Footer"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { getCurrentPageFromPathname, createNavigationHandler } from "@/src/lib/navigation"
import { type Locale } from "@/src/config/i18n"

interface ClientAppProps {
  children: React.ReactNode
  lang: Locale
}

export function ClientApp({ children, lang }: ClientAppProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  const currentPage = getCurrentPageFromPathname(pathname)
  const handleNavigate = (page: string) => {
    const route = createNavigationHandler(lang)(page)
    router.push(route)
  }

  return (
    <div className="min-h-screen">
      <AMIANavigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        languageSwitcher={<LanguageSwitcher currentLang={lang} />}
      />
      <main>{children}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

