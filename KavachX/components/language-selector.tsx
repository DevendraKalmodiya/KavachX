"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: "en", name: t("english"), flag: "🇺🇸" },
    { code: "hi", name: t("hindi"), flag: "🇮🇳" },
    { code: "es", name: t("spanish"), flag: "🇪🇸" },
    { code: "fr", name: t("french"), flag: "🇫🇷" },
    { code: "ja", name: t("japanese"), flag: "🇯🇵" },
    { code: "ar", name: t("arabic"), flag: "🇸🇦" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent border-gray-200 hover:bg-gray-50">
          <Globe className="h-4 w-4" />
          {t("language")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className={`flex items-center gap-3 ${language === lang.code ? "bg-emerald-50 text-emerald-700" : ""}`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
