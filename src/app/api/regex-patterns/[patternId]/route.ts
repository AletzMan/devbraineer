import prisma from '@/lib/db';
import { RegexPattern } from '@prisma/client';
import { NotFoundError, ServerError } from '../../_services/errors';
import {
    SuccessDelete,
    SuccessResponse,
} from '../../_services/successfulResponses';

// GET /api/regex-patterns/[patternId]
// Obtiene los detalles de un patrón de regex específico por su ID. (Público en el MVP)
export async function GET(
    req: Request,
    { params }: { params: { patternId: string } }
) {
    try {
        // La ID del patrón que queremos obtener se obtiene de los parámetros de la URL.
        const targetPatternId = params.patternId;

        // Busca el patrón en la base de datos por su ID.
        const pattern: RegexPattern | null =
            await prisma.regexPattern.findUnique({
                where: { id: targetPatternId },
                // Opcional: Incluir el usuario si quieres mostrar quién lo guardó
                // include: { user: { select: { username: true } } }
            });

        // Si no se encuentra el patrón con esa ID, retorna un 404.
        if (!pattern) {
            return NotFoundError();
        }

        // Retorna los detalles del patrón encontrado con un estado 200.
        return SuccessResponse(pattern);
    } catch (error) {
        console.error('Error fetching regex pattern details:', error);
        return ServerError();
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { patternId: string } }
) {
    try {
        const targetPatternId = params.patternId;
        const deletedPattern = await prisma.regexPattern.delete({
            where: { id: targetPatternId },
        });
        return SuccessDelete(deletedPattern);
    } catch (error) {
        console.error('Error deleting regex pattern:', error);
        return ServerError();
    }
}
