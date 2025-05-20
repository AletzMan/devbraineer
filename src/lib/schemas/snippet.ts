import { z } from 'zod';

export const createSnippetSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    code: z.string().min(1),
    language: z.string().min(1),
    category: z.string().optional(),
    tags: z.array(z.string().min(1)).optional(),
});
