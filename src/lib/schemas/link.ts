import { z } from 'zod';

export const createLinkSchema = z.object({
    url: z.string().url(),
    title: z.string().min(1),
    description: z.string().optional(),
    thumbnailUrl: z.string().url('Formato de URL de miniatura inválido.').optional().or(z.literal('')),
    tags: z.array(z.string().min(1)).optional(),
    category: z.string().optional(),
});

export const updateLinkSchema = z
    .object({
        url: z.string().url().nullable().or(z.literal('')).optional(),
        title: z.string().min(1, 'El título es requerido.').optional(),
        description: z.string().optional(),
        thumbnailUrl: z.string().url().nullable().or(z.literal('')).optional(),
        tags: z.array(z.string().min(1)).optional(),
        category: z.string().optional(),
    })
    .partial();
