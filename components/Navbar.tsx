"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DashLogo from "./DashLogo"
import { cn } from "@/lib/utils"
import { DotPattern } from "./ui/dot-pattern"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const { setTheme } = useTheme()
    const router = useRouter()
    return (
        <nav className="p-3 px-6 flex justify-between items-center" suppressHydrationWarning>
            <div onClick={() => router.push("/")} className="flex justify-center gap-2 items-center cursor-pointer">
                <Image width={24} height={24} src={'/dash-logo.png'} alt="dash logo" />
                <DashLogo />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DotPattern
                width={30}
                height={30}
                cx={2}
                cy={2}
                cr={1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] absolute -z-50 opacity-50",
                )} />
        </nav>

    )
}
