'use client';
import { Plus, Copy, Folder, Search, Tag, Code } from 'lucide-react';

export default function SnippetsPage() {
    return (
        <div className="flex h-[calc(100svh-4rem)] p-2">
            <div className="flex-1 max-w-[1600px]  mx-auto ">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                            Snippets de Código
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Guarda y organiza fragmentos de código para
                            reutilizarlos fácilmente
                        </p>
                    </div>
                    <button className="btn gap-1">
                        <Plus className="w-4 h-4" />
                        Nuevo Snippet
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 scrollbar-thin overflow-y-auto h-[calc(100svh-10.5rem)]">
                    <div className="md:col-span-1">
                        <div className="sticky top-4 space-y-6">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                                <input
                                    type="search"
                                    placeholder="Buscar snippets..."
                                    className="input w-full pl-9 bg-white dark:bg-zinc-800"
                                />
                            </div>

                            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                                <h3 className="font-medium mb-3 text-zinc-900 dark:text-zinc-50">
                                    Categorías
                                </h3>
                                <div className="space-y-2">
                                    <button className="btn w-full justify-start gap-2 font-normal">
                                        <Folder className="h-4 w-4" />
                                        JavaScript
                                        <span className="ml-auto text-zinc-500 dark:text-zinc-400 text-xs">
                                            12
                                        </span>
                                    </button>
                                    <button className="btn w-full justify-start gap-2 font-normal">
                                        <Folder className="h-4 w-4" />
                                        React
                                        <span className="ml-auto text-zinc-500 dark:text-zinc-400 text-xs">
                                            8
                                        </span>
                                    </button>
                                    <button className="btn w-full justify-start gap-2 font-normal">
                                        <Folder className="h-4 w-4" />
                                        CSS
                                        <span className="ml-auto text-zinc-500 dark:text-zinc-400 text-xs">
                                            5
                                        </span>
                                    </button>
                                    <button className="btn w-full justify-start gap-2 font-normal">
                                        <Folder className="h-4 w-4" />
                                        Node.js
                                        <span className="ml-auto text-zinc-500 dark:text-zinc-400 text-xs">
                                            7
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                                <h3 className="font-medium mb-3 text-zinc-900 dark:text-zinc-50">
                                    Etiquetas
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <button className="btn gap-1 h-7">
                                        <Tag className="h-3 w-3" />
                                        utilidades
                                    </button>
                                    <button className="btn gap-1 h-7">
                                        <Tag className="h-3 w-3" />
                                        hooks
                                    </button>
                                    <button className="btn gap-1 h-7">
                                        <Tag className="h-3 w-3" />
                                        algoritmos
                                    </button>
                                    <button className="btn gap-1 h-7">
                                        <Tag className="h-3 w-3" />
                                        animaciones
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-3 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="card">
                                <div className="card-header">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg">
                                            Función debounce
                                        </h3>
                                        <button className="btn btn-ghost btn-circle">
                                            <Copy className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="card-description">
                                        Limita la frecuencia de ejecución de una
                                        función
                                    </div>
                                </div>
                                <div className="card-content">
                                    <pre className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md text-sm overflow-x-auto">
                                        <code>{`function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}`}</code>
                                    </pre>
                                </div>
                                <div className="card-footer">
                                    <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                                        <Code className="h-3 w-3 mr-1" />
                                        JavaScript
                                        <span className="mx-2">•</span>
                                        <Tag className="h-3 w-3 mr-1" />
                                        utilidades
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg">
                                        useLocalStorage Hook
                                    </h3>
                                    <button className="btn btn-ghost btn-circle">
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="card-description">
                                    Hook para persistir estado en localStorage
                                </div>
                                <div className="card-content">
                                    <pre className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md text-sm overflow-x-auto">
                                        <code>{`function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}`}</code>
                                    </pre>
                                </div>
                                <div className="card-footer">
                                    <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                                        <Code className="h-3 w-3 mr-1" />
                                        React
                                        <span className="mx-2">•</span>
                                        <Tag className="h-3 w-3 mr-1" />
                                        hooks
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg">
                                        Función deepClone
                                    </h3>
                                    <button className="btn btn-ghost btn-circle">
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="card-description">
                                    Crea una copia profunda de un objeto
                                </div>
                                <div className="pb-2">
                                    <pre className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md text-sm overflow-x-auto">
                                        <code>{`function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  const clonedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  
  return clonedObj;
}`}</code>
                                    </pre>
                                </div>
                                <div className="card-footer">
                                    <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                                        <Code className="h-3 w-3 mr-1" />
                                        JavaScript
                                        <span className="mx-2">•</span>
                                        <Tag className="h-3 w-3 mr-1" />
                                        utilidades
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg">
                                        Animación Fade In CSS
                                    </h3>
                                    <button className="btn btn-ghost btn-circle">
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="card-description">
                                    Animación suave de aparición
                                </div>
                                <div className="pb-2">
                                    <pre className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md text-sm overflow-x-auto">
                                        <code>{`@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Uso con delay para elementos secuenciales */
.fade-in-1 { animation-delay: 0.1s; }
.fade-in-2 { animation-delay: 0.2s; }
.fade-in-3 { animation-delay: 0.3s; }`}</code>
                                    </pre>
                                </div>
                                <div className="card-footer">
                                    <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                                        <Code className="h-3 w-3 mr-1" />
                                        CSS
                                        <span className="mx-2">•</span>
                                        <Tag className="h-3 w-3 mr-1" />
                                        animaciones
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
