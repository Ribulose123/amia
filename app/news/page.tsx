import { redirect } from "next/navigation"
import { i18n } from "@/src/config/i18n"

export default function News() {
  redirect(`/${i18n.defaultLocale}/news`)
}

