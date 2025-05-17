"use client"
import { useState } from "react"

export default function Header() {
    const [theme, setTheme] = useState("light")
    return (
        <header className="  flex items-center justify-between mb-6 h-16 w-full bg-(--color-base-100) border-b-1 border-(--color-gray-700)">
            <div className="flex items-center gap-2">
                <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
        </header>
    )
}