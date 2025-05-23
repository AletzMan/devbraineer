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
            className="bg-base-200 rounded-lg shadow-sm p-4 flex flex-col justify-between "
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            <div>
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
                {snippet.description && (
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3">{snippet.description}</p>
                )}
                <div className="rounded-md text-sm overflow-x-auto font-mono text-zinc-800 dark:text-zinc-200 mb-3 max-h-48 overflow-hidden scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    <CodeBlock code={snippet.code} language={snippet.language} theme={themes.oneDark}>
                        <div className="relative overflow-hidden">
                            <CodeBlock.Code className="bg-neutral-900 overflow-hidden !p-6 rounded-b-sm shadow-lg border-1 border-gray-800 h-40 overflow-y-auto scrollbar-thin">
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
            <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                <Code className="h-3 w-3 mr-1" />
                <span>{snippet.language}</span>
                {snippet.category && (
                    <>
                        <span className="mx-2">•</span>
                        <Folder className="h-3 w-3 mr-1" />
                        <span>{snippet.category}</span>
                    </>
                )}
                {snippet.tags && snippet.tags.length > 0 && (
                    <>
                        <span className="mx-2">•</span>
                        <div className="flex flex-wrap gap-1">
                            {snippet.tags.map((tag, idx) => (
                                <span key={idx} className="badge badge-sm badge-info badge-outline mr-0.5">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
