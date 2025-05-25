import { z } from 'zod';

export const createCollectionSchema = z.object({
    name: z.string().min(1),
    method: z.string(),
    url: z.string(),
    headers: z.array(z.object({ key: z.string(), value: z.string() })),
    body: z.string().optional(),
    response: z.string(),
});

export const updateCollectionSchema = createCollectionSchema.partial();
