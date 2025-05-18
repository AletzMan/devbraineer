"use client"

import { useState } from "react"
import { WebMode } from "./components/WebMode"
import { ConsoleMode } from "./components/ConsoleMode"


interface FileData {
  id: string
  name: string
  content: string
  language: string
  type: string
}

export default function PlaygroundPage() {
  const [mode, setMode] = useState("web")
  const [toast, setToast] = useState({
    title: "",
    description: "",
    variant: "info",
    open: false,

  })


  return (
    <div className="flex h-[calc(100vh-4rem)] bg-neutral/50 scrollbar-thin overflow-y-auto">
      {toast.open && <div className="toast toast-top toast-end z-50 ">
        <div className={`flex flex-col gap-1 items-start alert alert-${toast.variant}`}>
          <span className="font-bold">{toast.title}</span>
          <span>{toast.description}</span>
        </div>
      </div>}
      <div className="flex flex-col gap-2 flex-1 max-w-[1600px] mx-auto p-2 w-full">
        {/* name of each tab group should be unique */}
        <div className="flex justify-end border-b-1 border-(--color-gray-700) pb-2">
          <div className="tabs tabs-box w-max self-end">
            <input type="radio" name="my_tabs_1" className={`tab ${mode === "web" ? "tab-active [--tab-bg:var(--color-secondary)]" : ""}`} aria-label="Modo Web" checked={mode === "web"} onChange={() => setMode("web")} />
            <input type="radio" name="my_tabs_1" className={`tab ${mode === "console" ? "tab-active [--tab-bg:var(--color-secondary)]" : ""}`} aria-label="Modo Consola" checked={mode === "console"} onChange={() => setMode("console")} />
          </div>
        </div>

        {mode === "web" ? <WebMode /> : <ConsoleMode />}

      </div>
    </div>
  )
}
