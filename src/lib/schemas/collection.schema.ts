import { z } from 'zod';

/*export const createCollectionSchema = z.object({
    name: z.string().min(1),
    method: z.string(),
    url: z.string(),
    headers: z.array(z.object({ key: z.string(), value: z.string() })),
    body: z.string().optional(),
    response: z.string(),
});*/

export const createCollectionSchema = z.object({
    name: z.string().min(1),
    request: z
        .object({
            method: z.string().min(1),
            url: z.string().url(),
            headers: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
            body: z.string().optional(),
            response: z.string().optional(),
        })
        .optional(), // <-- Hacemos opcional el request
});

export const updateCollectionSchema = createCollectionSchema.partial();
