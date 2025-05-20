import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { Link } from '@prisma/client';
import {
    SuccessCreate,
    SuccessResponse,
} from '../_services/successfulResponses';
import {
    NotAuthorizedError,
    ServerError,
    UnprocessableEntityError,
} from '../_services/errors';
import { createLinkSchema } from '@/lib/schemas/link';
import { ZodError } from 'zod';

// GET /api/links
export async function GET(req: Request) {
    try {
        // Obtiene todos los links de la base de datos.
        const links: Link[] = await prisma.link.findMany({
            orderBy: {
                created_at: 'desc', // Opcional: Ordenar por fecha de creación
            },
            // Opcional: Incluir el sharer si quieres mostrar quién compartió el link
            // include: { sharer: { select: { username: true } } }
        });

        // Retorna la lista de links con un estado 200.
        return SuccessResponse(links);
    } catch (error) {
        console.error('Error fetching links:', error);
        return ServerError();
    }
}

// POST /api/links
// Crea un nuevo link/recurso. Requiere autenticación.
export async function POST(req: Request) {
    const { userId } = await auth(); // Obtiene el ID del usuario autenticado de Clerk

    // Si no hay userId, el usuario no está autenticado, retorna un 401.
    if (!userId) {
        return NotAuthorizedError();
    }

    try {
        // Obtiene los datos del link del cuerpo de la solicitud.
        const { url, title, description, category, thumbnailUrl, tags } =
            await req.json();

        const validatedData = createLinkSchema.parse({
            url,
            title,
            description,
            category,
            thumbnailUrl,
            tags,
        });
        const {
            url: validatedUrl,
            title: validatedTitle,
            description: validatedDescription,
            category: validatedCategory,
            thumbnailUrl: validatedThumbnailUrl,
            tags: validatedTags,
        } = validatedData;

        // Crea el link en la base de datos.
        const newLink: Link = await prisma.link.create({
            data: {
                url: validatedUrl,
                title: validatedTitle,
                description: validatedDescription || '',
                category: validatedCategory || '',
                thumbnailUrl: validatedThumbnailUrl || null,
                tags: validatedTags || [],
                sharerId: userId,
            },
        });

        // Retorna el link recién creado con un estado 201 (Created).
        return SuccessCreate(newLink);
    } catch (error) {
        // Opcional: Manejo de errores de Zod
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues);
        }
        console.error('Error creating link:', error);
        return ServerError();
    }
}

// Nota: No necesitamos funciones PUT o DELETE aquí para el MVP.
