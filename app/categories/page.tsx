"use client"

import { useRouter } from "next/navigation"
import { CategoriesPage } from "../pages/CategoriesPage"

export default function Categories() {
  const router = useRouter()
  return <CategoriesPage onNavigate={(page: string) => {
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

