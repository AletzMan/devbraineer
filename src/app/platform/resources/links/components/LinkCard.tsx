// components/LinkCard.tsx
'use client';

import { Link as LinkIcon, Copy, Trash2, Edit, Tag, Folder } from 'lucide-react';
import { Link } from '@prisma/client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { generateThumbnailUrl, getBaseDomain, getFavicon } from '@/lib/helpers';

interface LinkCardProps {
    link: Link;
    onDelete: (link: Link) => void;
    onEdit: (link: Link) => void;
}

export default function LinkCard({ link, onDelete, onEdit }: LinkCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link.url);
        setCopied(true);
        toast.success('URL copiada al portapapeles!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = () => {
        onDelete(link);
    };

    const handleEdit = () => {
        onEdit(link);
    };

    const displayThumbnailUrl = link.thumbnailUrl || generateThumbnailUrl(link.url);
    const faviconUrl = getFavicon(link.url);
    const baseDomain = getBaseDomain(link.url);

    return (
        <div
            className="
                bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-4
                flex flex-col justify-between
                transition-all duration-300 ease-in-out  
                hover:border-blue-500   
                hover:translate-y-[-1px]  
            ">
            <div>
                {displayThumbnailUrl && (
                    <div className="mb-3 rounded-md overflow-hidden aspect-video bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <img
                            src={displayThumbnailUrl}
                            alt={`Thumbnail for ${link.title}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                                (e.target as HTMLImageElement).alt = 'Default thumbnail';
                            }}
                        />
                    </div>
                )}
                <div className="flex justify-between items-start mb-2">
                    <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline leading-tight break-words">
                        {link.title}
                    </a>
                    <div className="flex gap-1 items-center">
                        <button
                            className="btn btn-ghost btn-circle btn-sm tooltip tooltip-left"
                            data-tip="Editar"
                            onClick={handleEdit}>
                            <Edit className="h-4 w-4 text-zinc-500 hover:text-blue-500" />
                        </button>
                        <button
                            className="btn btn-ghost btn-circle btn-sm tooltip tooltip-left"
                            data-tip={copied ? 'Copiado!' : 'Copiar URL'}
                            onClick={handleCopy}>
                            <Copy
                                className={`h-4 w-4 ${copied ? 'text-green-500' : 'text-zinc-500 hover:text-green-500'}`}
                            />
                        </button>
                        <button
                            className="btn btn-ghost btn-circle btn-sm tooltip tooltip-left"
                            data-tip="Eliminar"
                            onClick={handleDelete}>
                            <Trash2 className="h-4 w-4 text-zinc-500 hover:text-red-500" />
                        </button>
                    </div>
                </div>
                {link.description && (
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3 break-words">{link.description}</p>
                )}
                <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-300 text-sm truncate hover:underline mb-3 flex items-center">
                    {faviconUrl && <img src={faviconUrl} alt="Favicon" className="w-4 h-4 mr-1 rounded-sm" />}
                    <span className="text-zinc-500 dark:text-zinc-400">Dominio: </span>
                    {baseDomain}
                </a>
            </div>
            <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                <LinkIcon className="h-3 w-3 mr-1" />
                <span>Enlace</span>
                {link.category && (
                    <>
                        <span className="mx-2">•</span>
                        <Folder className="h-3 w-3 mr-1" />
                        <span>{link.category}</span>
                    </>
                )}
                {link.tags && link.tags.length > 0 && (
                    <>
                        <span className="mx-2">•</span>
                        <Tag className="h-3 w-3 mr-1" />
                        <div className="flex flex-wrap gap-1">
                            {link.tags.map((tag, idx) => (
                                <span key={idx} className="badge badge-sm badge-info badge-outline mr-0.5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
