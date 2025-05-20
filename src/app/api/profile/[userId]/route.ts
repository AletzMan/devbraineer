import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import {
    ForbiddenError,
    NotFoundError,
    ServerError,
} from '../../_services/errors';
import {
    SuccessResponse,
    SuccessUpdate,
} from '../../_services/successfulResponses';

// Obtiene la información pública del perfil de un usuario específico.
export async function GET(
    req: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const targetUserId = (await params).userId;

        // Busca el perfil en la base de datos usando el userId
        const profile = await prisma.profile.findUnique({
            where: { userId: targetUserId },
            // Puedes incluir el usuario relacionado si necesitas algunos datos del User model
            // include: { user: { select: { username: true, email: true } } },
        });

        if (!profile) {
            return NotFoundError();
        }

        // Retorna la información del perfil
        return SuccessResponse(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return ServerError();
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId: authenticatedUserId } = await auth();
    const targetUserId = (await params).userId;

    // Verifica si el usuario autenticado tiene permiso para actualizar este perfil
    if (!authenticatedUserId || authenticatedUserId !== targetUserId) {
        return ForbiddenError();
    }

    try {
        // Obtiene los datos de actualización del cuerpo de la solicitud
        const { avatar_url, city, country, description, technologies } =
            await req.json();

        // Actualiza el perfil en la base de datos
        const updatedProfile = await prisma.profile.upsert({
            where: { userId: targetUserId },
            update: {
                avatar_url: avatar_url,
                city: city,
                country: country,
                description: description,
                technologies: technologies,
            },
            create: {
                userId: targetUserId,
                avatar_url: avatar_url,
                city: city,
                country: country,
                description: description,
                technologies: technologies,
            },
        });

        // Retorna el perfil actualizado
        return SuccessUpdate(updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error);
        return ServerError();
    }
}
