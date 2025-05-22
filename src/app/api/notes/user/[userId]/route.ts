import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { NotAuthorizedError, NotFoundError, ServerError } from '@/app/api/_services/errors';
import { SuccessResponse } from '@/app/api/_services/successfulResponses';

export async function GET(req: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await auth();

        const idUser = (await params).userId;
        if (!userId) {
            return NotAuthorizedError();
        }
        const notes = await prisma.note.findMany({
            where: {
                userId: idUser,
            },
        });
        if (notes) {
            return SuccessResponse(notes);
        }

        return NotFoundError();
    } catch (error) {
        console.error('Error fetching note:', error);
        return ServerError();
    }
}
