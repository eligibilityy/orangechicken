"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3">
      <Label htmlFor="theme-toggle" className="sr-only">
        Toggle theme
      </Label>
      <Sun className="w-5 h-5 text-neutral-900 dark:text-neutral-50" />
      <Switch
        id="theme-toggle"
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <Moon className="w-5 h-5 text-neutral-900 dark:text-neutral-50" />
    </div>
  );
}
