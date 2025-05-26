'use client';

import { noteColors } from '@/app/platform/constants';
import { useEffect, useState } from 'react';
interface NoteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; content: string; color: string }) => Promise<void>;
    note: {
        title: string;
        content: string;
        color: string;
    } | null;
}

export function NoteDialog({ isOpen, onClose, onSubmit, note }: NoteDialogProps) {
    const [formData, setFormData] = useState({
        title: note?.title || '',
        content: note?.content || '',
        color: note?.color || 'bg-primary',
    });

    useEffect(() => {
        if (note) {
            setFormData({
                title: note.title,
                content: note.content,
                color: note.color,
            });
        }
    }, [note]);

    const handleChange =
        (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
        onClose();
    };

    return (
        <>
            <input
                type="checkbox"
                id="note-modal"
                className="modal-toggle"
                checked={isOpen}
                onChange={(e) => onClose()}
            />
            <div className="modal">
                <div className={`modal-box rounded-md max-w-[425px] overflow-hidden`}>
                    <div className={`absolute -top-5 -right-12 w-30 h-15 rotate-45  ${formData.color}`} />
                    <h3 className="font-bold text-lg mb-4 relative z-10">{note ? 'Editar nota' : 'Nueva nota'}</h3>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            await handleSubmit(e);
                        }}
                        className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Título de la nota"
                                value={formData.title}
                                onChange={handleChange('title')}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Contenido de la nota..."
                                value={formData.content}
                                onChange={handleChange('content')}
                                required
                                className="textarea textarea-bordered w-full h-32"
                            />
                        </div>
                        <div className="flex gap-2">
                            {noteColors.map((color: string) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, color }))}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                                        formData.color === color ? 'ring-1 ring-offset-1' : ''
                                    } ${color}`}>
                                    {formData.color === color && <span className="text-white">✓</span>}
                                </button>
                            ))}
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn btn-outline" onClick={onClose}>
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }}>
                                {note ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
