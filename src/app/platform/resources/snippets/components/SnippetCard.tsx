// components/SnippetCard.tsx
'use client';

import { Copy, Code, Tag, Trash2, Edit, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { Snippet } from '@prisma/client'; // Importa el tipo Snippet
import { useState } from 'react';
import { toast } from 'react-hot-toast'; // O tu librería de notificaciones preferida
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';

interface SnippetCardProps {
    snippet: Snippet;
    onDelete: (snippet: Snippet) => void; // Callback para eliminar
    onEdit?: (snippet: Snippet) => void; // Opcional para editar
    onOpenCodeModal?: (snippet: Snippet) => void;
}

export default function SnippetCard({ snippet, onDelete, onEdit, onOpenCodeModal }: SnippetCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet.code);
        setCopied(true);
        toast.success('Snippet copiado al portapapeles!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = () => {
        onDelete(snippet);
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(snippet);
        }
    };

    return (
        <motion.div
            className="bg-base-200 border border-base-300 rounded-lg shadow-sm p-4 flex flex-col justify-between "
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            <div className="flex flex-col gap-1 h-full">
                <div className="flex justify-between items-start mb-2 ">
                    <h3 className="text-lg font-semibold text-accent leading-tight">{snippet.title}</h3>
                    <div className="flex gap-1">
                        {onEdit && (
                            <button
                                className="btn btn-ghost btn-circle btn-sm tooltip tooltip-left"
                                data-tip="Editar"
                                onClick={handleEdit}>
                                <Edit className="h-4 w-4 text-zinc-500 hover:text-blue-500" />
                            </button>
                        )}
                        <button
                            className="btn btn-ghost btn-circle btn-sm tooltip tooltip-left"
                            data-tip="Eliminar"
                            onClick={handleDelete}>
                            <Trash2 className="h-4 w-4 text-zinc-500 hover:text-red-500" />
                        </button>
                        {onOpenCodeModal && (
                            <button
                                className="btn btn-ghost btn-circle btn-sm tooltip tooltip-left"
                                data-tip="Ver código"
                                onClick={() => onOpenCodeModal(snippet)}>
                                <Code className="h-4 w-4 text-zinc-500 hover:text-blue-500" />
                            </button>
                        )}
                        <button
                            className="btn btn-ghost btn-circle btn-sm tooltip tooltip-left"
                            data-tip="Copiar"
                            onClick={handleCopy}>
                            <Copy className="h-4 w-4 text-zinc-500 hover:text-blue-500" />
                        </button>
                    </div>
                </div>
                {snippet.description && <p className="text-base-content/60 text-sm mb-3">{snippet.description}</p>}
                <div className="rounded-sm text-sm overflow-hidden font-mono mb-3 max-h-48 scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    <CodeBlock code={snippet.code} language={snippet.language} theme={themes.oneDark}>
                        <div className="relative overflow-hidden">
                            <CodeBlock.Code className="bg-base-300 overflow-hidden !p-6 rounded-b-sm shadow-lg border-1 border-base-content/10 h-40 overflow-y-auto scrollbar-thin">
                                <div className="table-row">
                                    <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                                    <CodeBlock.LineContent className="table-cell">
                                        <CodeBlock.Token />
                                    </CodeBlock.LineContent>
                                </div>
                            </CodeBlock.Code>
                        </div>
                    </CodeBlock>
                </div>
            </div>
            <footer className="flex items-center bg-base-content/2 px-2 py-2 text-xs mt-auto">
                <Code className="size-3 mr-1" />
                <span className="text-base-content/80">{snippet.language}</span>
                {snippet.category && (
                    <>
                        <span className="mx-2">•</span>
                        <Folder className="size-3 mr-1" />
                        <span className="text-base-content/80">{snippet.category}</span>
                    </>
                )}
                {snippet.tags && snippet.tags.length > 0 && (
                    <>
                        <span className="mx-2">•</span>
                        <div className="flex flex-wrap gap-1">
                            {snippet.tags.map((tag, idx) => (
                                <span key={idx} className="badge badge-sm badge-info badge-outline mr-0.5 rounded-md">
                                    <Tag className="size-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </footer>
        </motion.div>
    );
}
