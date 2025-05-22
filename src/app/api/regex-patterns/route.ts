import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { RegexPattern } from '@prisma/client';
import { SuccessCreate, SuccessResponse } from '../_services/successfulResponses';
import { BadRequestError, NotAuthorizedError, ServerError, UnprocessableEntityError } from '../_services/errors';
import { createRegexPatternSchema } from '@/lib/schemas/regex-pattern';
import { ZodError } from 'zod';

export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NotAuthorizedError();
        }
        const patterns: RegexPattern[] = await prisma.regexPattern.findMany({
            where: { user: { id: userId } },
            orderBy: {
                created_at: 'asc', // Opcional: Ordenar por nombre o fecha
            },
            // Opcional: Incluir el usuario si quieres mostrar quién guardó el patrón
            // include: { user: { select: { username: true } } }
        });
        return SuccessResponse(patterns);
    } catch (error) {
        console.error('Error fetching regex patterns:', error);
        return ServerError();
    }
}

export async function POST(req: Request) {
    const { userId } = await auth();

    // Si no hay userId, el usuario no está autenticado, retorna un 401.
    if (!userId) {
        return NotAuthorizedError();
    }

    try {
        // Obtiene los datos del patrón del cuerpo de la solicitud.
        const { name, pattern, description } = await req.json();

        const validatedData = createRegexPatternSchema.parse({
            name,
            pattern,
            description,
        });
        const { name: validatedName, pattern: validatedPattern, description: validatedDescription } = validatedData;

        // Validación básica (si no usas Zod)
        if (!name || !pattern) {
            return BadRequestError('Missing required fields (name, pattern)');
        }

        // Crea el patrón en la base de datos.
        const newPattern: RegexPattern = await prisma.regexPattern.create({
            data: {
                name: validatedName,
                pattern: validatedPattern,
                description: validatedDescription || '',
                userId,
            },
        });

        // Retorna el patrón recién creado con un estado 201 (Created).
        console.log('Patrón creado:', newPattern);
        return SuccessCreate(newPattern);
    } catch (error) {
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues);
        }
        console.error('Error creating regex pattern:', error);
        return ServerError();
    }
}
