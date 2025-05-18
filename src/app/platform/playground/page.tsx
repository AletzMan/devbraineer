"use client"

import { useState, useEffect, useRef } from "react"
// Using standard HTML elements with DaisyUI classes
// No need to import components, DaisyUI provides utility classes
import {
  Play,
  Download,
  Copy,
  Check,
  Trash2,
  Save,
  Code,
  Terminal,
  RefreshCw,
  Maximize2,
  Minimize2,
  Plus,
  Edit2,
  X,
  FileText,
  FileCode,
} from "lucide-react"

// Importamos el editor de código
import Editor from "@monaco-editor/react"
import { WebMode } from "./components/WebMode"

// Definir tipos para los archivos
interface FileData {
  id: string
  name: string
  content: string
  language: string
  type: string
}

export default function PlaygroundPage() {
  // Añadir un nuevo estado para controlar si se usa Tailwind o CSS normal
  const [useTailwind, setUseTailwind] = useState(false)

  // Añadir estado para el modo actual (web o consola)
  const [mode, setMode] = useState("web")
  const [toast, setToast] = useState({
    title: "",
    description: "",
    variant: "info",
    open: false,

  })


  return (
    <div className="flex min-h-screen  ">
      {toast.open && <div className="toast toast-top toast-end z-50 ">
        <div className={`flex flex-col gap-1 items-start alert alert-${toast.variant}`}>
          <span className="font-bold">{toast.title}</span>
          <span>{toast.description}</span>
        </div>
      </div>}
      <div className="flex-1 max-w-[1600px] mx-auto p-4 w-full">
        <div className="flex items-center justify-between mb-6">

        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setMode("web")}
              className={mode === "web" ? "rounded-r-none " : "rounded-r-none "}
            >
              Modo Web
            </button>
            <button
              onClick={() => setMode("console")}
              className={mode === "console" ? "rounded-l-none " : "rounded-l-none "}
            >
              Modo Consola
            </button>
          </div>
        </div>

        <WebMode />

      </div>
    </div>
  )
}
