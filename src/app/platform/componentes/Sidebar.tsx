"use client"
import Link from "next/link"
import { Code2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { MenuItem } from "./MenuItem"
import { menuData } from "../constants"

export function Sidebar() {
    const path = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState('resources')
    console.log(isMenuOpen)
    return (
        <aside className="z-50 w-67 hidden lg:block max-2xl:w-15 bg-(--color-base-100) h-svh overflow-y-auto overflow-x-hidden border-r-1 border-(--color-gray-700) scrollbar-thin transition-all duration-200 group hover:max-2xl:w-67">
            {<nav className="sticky top-4">

                <div className="flex items-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center animate-pulse-glow">
                        <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl bg-clip-text text-transparent">DevBraineer</span>
                </div>

                {menuData.map((item) => (
                    <MenuItem key={item.label} item={item} currentPath={path} />
                ))}

            </nav >}
        </aside >
    )
}
