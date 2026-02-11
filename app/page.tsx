import { redirect } from "next/navigation"
import { i18n } from "@/src/config/i18n"

export default function Home() {
  redirect(`/${i18n.defaultLocale}`)
}
