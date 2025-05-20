import prisma from '@/lib/db';
import { Link } from '@prisma/client';
import { NotFoundError, ServerError } from '@api/_services/errors';
import { SuccessResponse } from '@api/_services/successfulResponses';

// GET /api/links/[linkId]
export async function GET(
    req: Request,
    { params }: { params: { linkId: string } }
) {
    try {
        // La ID del link que queremos obtener se obtiene de los parámetros de la URL.
        const targetLinkId = params.linkId;

        // Busca el link en la base de datos por su ID.
        const link: Link | null = await prisma.link.findUnique({
            where: { id: targetLinkId },
            // Opcional: Incluir el sharer si quieres mostrar quién lo compartió
            // include: { sharer: { select: { username: true } } }
        });

        // Si no se encuentra el link con esa ID, retorna un 404.
        if (!link) {
            return NotFoundError();
        }

        // Retorna los detalles del link encontrado con un estado 200.
        return SuccessResponse(link);
    } catch (error) {
        console.error('Error fetching link details:', error);
        return ServerError();
    }
}
