"use client"

import { useRouter } from "next/navigation"
import { EventNightPage } from "../pages/EventNightPage"

export default function Event() {
  const router = useRouter()
  return <EventNightPage onNavigate={(page: string) => {
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

