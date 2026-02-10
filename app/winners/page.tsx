"use client"

import { useRouter } from "next/navigation"
import { WinnersPage } from "../pages/WinnersPage"

export default function Winners() {
  const router = useRouter()
  return <WinnersPage onNavigate={(page: string) => {
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

