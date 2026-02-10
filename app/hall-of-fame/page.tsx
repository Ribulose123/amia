"use client"

import { useRouter } from "next/navigation"
import { HallOfFamePage } from "../pages/HallOfFamePage"

export default function HallOfFame() {
  const router = useRouter()
  return <HallOfFamePage onNavigate={(page: string) => {
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
  }} />
}

