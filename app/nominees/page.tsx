"use client"

import { useRouter } from "next/navigation"
import { NomineesPage } from "../pages/NomineesPage"

export default function Nominees() {
  const router = useRouter()
  return <NomineesPage onNavigate={(page: string) => {
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

