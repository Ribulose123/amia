"use client"

import { useRouter } from "next/navigation"
import { AboutPage } from "../pages/AboutPage"

export default function About() {
  const router = useRouter()
  return <AboutPage onNavigate={(page: string) => {
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

