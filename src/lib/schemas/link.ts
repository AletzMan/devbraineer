import { z } from 'zod';

export const createLinkSchema = z.object({
    url: z.string().url(),
    title: z.string().min(1),
    description: z.string().optional(),
    thumbnailUrl: z.string().url().optional(),
    tags: z.array(z.string().min(1)).optional(),
});
