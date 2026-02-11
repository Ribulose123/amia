import { redirect } from "next/navigation"
import { i18n } from "@/src/config/i18n"

export default function About() {
  redirect(`/${i18n.defaultLocale}/about`)
}

