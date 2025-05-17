"use client"
import { Code2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { MenuItem } from "./MenuItem"
import { menuData } from "../constants"
import { Logo } from "@/app/components/Logo"

export function Sidebar() {
    const path = usePathname()
    return (
        <aside className="z-50 w-67 hidden lg:block max-2xl:w-15 bg-(--color-base-100) h-svh overflow-y-auto overflow-x-hidden border-r-1 border-(--color-gray-700) scrollbar-thin transition-all duration-100 group hover:max-2xl:w-67">
            <div className="grid grid-cols-[2.5em_1fr] items-center gap-2 px-3 py-2 h-16 border-b-1 border-(--color-gray-700)">
                <Logo className="w-10 h-10 text-(--color-primary)" />
                <h1 className="items-center h-full pt-1.5 text-xl font-bold text-(--color-warning) max-2xl:hidden group-hover:max-2xl:flex" style={{ fontFamily: "var(--font-josefin-sans)" }}>DevBraineer</h1>
            </div>
            {<nav className="sticky top-4">
                {menuData.map((item) => (
                    <MenuItem key={item.label} item={item} currentPath={path} />
                ))}
            </nav >}
        </aside >
    )
}
