import { z } from 'zod';

export const createRegexPatternSchema = z.object({
    name: z.string().min(1),
    pattern: z.string().min(1),
    description: z.string().optional(),
});
