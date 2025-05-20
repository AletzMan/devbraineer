import { z } from 'zod';
import { PostType } from '@prisma/client';

export const createPostSchema = z.object({
    type: z.nativeEnum(PostType, {
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) {
                return {
                    message: `Invalid post type. Expected one of: ${Object.values(PostType).join(', ')}`,
                };
            }
            return { message: ctx.defaultError };
        },
    }),
    title: z.string().min(1, 'Title cannot be empty'),
    description: z.string().min(1, 'Description cannot be empty'),
    language: z.string().optional(),
    code_snippet: z.string().optional(),
    url: z.string().optional(),
    pollOptions: z
        .array(z.string().min(1, 'Poll option cannot be empty'))
        .optional(),
});

// --- Usando superRefine para validaciones condicionales ---
// Aplica validaciones adicionales basadas en los valores de otros campos.
export const createPostSchemaWithConditionalValidation =
    createPostSchema.superRefine((data, ctx) => {
        if (data.type === PostType.Poll) {
            if (!data.pollOptions || data.pollOptions.length < 2) {
                // Añade un error personalizado al contexto si la validación falla.
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Polls require at least two options.',
                    path: ['pollOptions'],
                });
            }
        }

        // Si el tipo es Resource o EventMeetup, la URL podría ser requerida.
        if (
            data.type === PostType.Resource ||
            data.type === PostType.EventMeetup
        ) {
            if (!data.url) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `${data.type} requires a URL.`,
                    path: ['url'],
                });
            }
        }
        // Si el tipo es Challenge, language y code_snippet podrían ser requeridos o recomendados.
        if (data.type === PostType.Challenge) {
            if (!data.language || !data.code_snippet) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        'Challenges should ideally include a language and code snippet.',
                    path: ['language', 'code_snippet'],
                });
            }
        }
    });

// Exporta el tipo inferido del esquema con validaciones condicionales.
// Este tipo reflejará las validaciones definidas, aunque algunas validaciones personalizadas
// en superRefine no se reflejan directamente en el tipo, la validación en tiempo de ejecución sí aplica.
export type CreatePostInput = z.infer<
    typeof createPostSchemaWithConditionalValidation
>;
