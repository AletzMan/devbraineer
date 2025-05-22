import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { Snippet } from '@prisma/client';
import { SuccessCreate, SuccessResponse } from '../_services/successfulResponses';
import { NotAuthorizedError, ServerError, UnprocessableEntityError } from '../_services/errors';
import { createSnippetSchema } from '@/lib/schemas/snippet';
import { ZodError } from 'zod';

// GET /api/snippets
export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NotAuthorizedError();
        }
        // Obtiene todos los snippets de la base de datos.
        const snippets: Snippet[] = await prisma.snippet.findMany({
            where: { authorId: userId },
            orderBy: {
                created_at: 'desc', // Opcional: Ordenar por fecha de creación
            },
            // Opcional: Incluir el autor si quieres mostrar quién publicó el snippet
            // include: { author: { select: { username: true } } }
        });

        // Retorna la lista de snippets con un estado 200.
        return SuccessResponse(snippets);
    } catch (error) {
        console.error('Error fetching snippets:', error);
        return ServerError();
    }
}

// POST /api/snippets
export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NotAuthorizedError();
    }

    try {
        const { title, description, code, language, category, tags } = await req.json();

        const validatedData = createSnippetSchema.parse({
            title,
            description,
            code,
            language,
            category,
            tags,
        });
        const {
            title: validatedTitle,
            description: validatedDescription,
            code: validatedCode,
            language: validatedLanguage,
            category: validatedCategory,
            tags: validatedTags,
        } = validatedData;

        const newSnippet: Snippet = await prisma.snippet.create({
            data: {
                title: validatedTitle,
                description: validatedDescription || '',
                code: validatedCode,
                language: validatedLanguage,
                category: validatedCategory || null,
                tags: validatedTags || [],
                authorId: userId,
            },
        });

        return SuccessCreate(newSnippet);
    } catch (error) {
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues);
        }
        console.error('Error creating snippet:', error);
        return ServerError();
    }
}
