"use client"

import { useRouter } from "next/navigation"
import { NewsPage } from "../pages/NewsPage"

export default function News() {
  const router = useRouter()
  return <NewsPage onNavigate={(page: string) => {
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

