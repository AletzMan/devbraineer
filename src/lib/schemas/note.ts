import { z } from 'zod';

export const createNoteSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
    content: z.string().min(1, 'Content is required').max(10000, 'Content must be less than 10000 characters'),
    color: z.enum(['bg-primary', 'bg-success', 'bg-error', 'bg-warning', 'bg-accent', 'bg-info', 'bg-neutral']),
    userId: z.string(),
});

export const updateNoteSchema = createNoteSchema.omit({ userId: true });

export type CreateNotePayload = z.infer<typeof createNoteSchema>;
export type UpdateNotePayload = z.infer<typeof updateNoteSchema>;
