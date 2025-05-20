import prisma from '@/lib/db';
import { Snippet } from '@prisma/client';
import { NotFoundError, ServerError } from '../../_services/errors';
import {
    SuccessDelete,
    SuccessResponse,
} from '../../_services/successfulResponses';

// GET /api/snippets/[snippetId]
export async function GET(
    req: Request,
    { params }: { params: Promise<{ snippetId: string }> }
) {
    try {
        const targetSnippetId = (await params).snippetId;

        // Busca el snippet en la base de datos por su ID.
        const snippet: Snippet | null = await prisma.snippet.findUnique({
            where: { id: targetSnippetId },
            // Opcional: Incluir el autor si quieres mostrar quién lo publicó
            // include: { author: { select: { username: true } } }
        });

        // Si no se encuentra el snippet con esa ID, retorna un 404.
        if (!snippet) {
            return NotFoundError();
        }

        // Retorna los detalles del snippet encontrado con un estado 200.
        return SuccessResponse(snippet);
    } catch (error) {
        console.error('Error fetching snippet details:', error);
        return ServerError();
    }
}

// DELETE /api/snippets/[snippetId]
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ snippetId: string }> }
) {
    try {
        const targetSnippetId = (await params).snippetId;
        const deletedSnippet = await prisma.snippet.delete({
            where: { id: targetSnippetId },
        });
        return SuccessDelete(deletedSnippet);
    } catch (error) {
        console.error('Error deleting snippet:', error);
        return ServerError();
    }
}
