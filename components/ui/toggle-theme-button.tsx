"use client"

import { useTheme } from "next-themes"
import { Button } from "./button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ToggleThemeButton() {

  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {
        theme === 'dark'
        ?
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        :
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      }
    </Button>
  )
}
