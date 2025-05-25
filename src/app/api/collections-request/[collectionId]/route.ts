import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { NotAuthorizedError, ServerError } from '@/app/api/_services/errors';
import { SuccessDelete } from '@/app/api/_services/successfulResponses';

export async function DELETE(request: Request, { params }: { params: Promise<{ collectionId: string }> }) {
    try {
        const targetCollectionId = (await params).collectionId;
        console.log('targetCollectionId', targetCollectionId);
        const { userId } = await auth();
        if (!userId) {
            return NotAuthorizedError();
        }

        const deletedCollection = await prisma.collection.delete({
            where: {
                id: targetCollectionId,
            },
        });
        return SuccessDelete(deletedCollection);
    } catch (error) {
        console.error('Error deleting collection:', error);
        return ServerError();
    }
}
