import { auth } from '@clerk/nextjs/server';
import { NotAuthorizedError, ServerError } from '../../_services/errors';
import { SuccessDelete } from '../../_services/successfulResponses';
import prisma from '@/lib/db';

export async function DELETE(request: Request) {
    try {
        const { targetCollectionName } = await request.json();
        console.log('targetCollectionName', targetCollectionName);
        const { userId } = await auth();
        if (!userId) {
            return NotAuthorizedError();
        }

        const deletedCollection = await prisma.collection.deleteMany({
            where: {
                name: targetCollectionName,
            },
        });
        return SuccessDelete(deletedCollection);
    } catch (error) {
        console.error('Error deleting collection:', error);
        return ServerError();
    }
}
