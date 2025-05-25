import prisma from '@/lib/db';
import { SuccessDelete, SuccessResponse } from '@/app/api/_services/successfulResponses';
import { NotAuthorizedError, ServerError } from '@/app/api/_services/errors';
import { auth } from '@clerk/nextjs/server';

export async function DELETE(request: Request, { params }: { params: Promise<{ requestId: string }> }) {
    try {
        const targetRequestId = (await params).requestId;
        console.log('targetRequestId', targetRequestId);
        const { userId } = await auth();
        if (!userId) {
            return NotAuthorizedError();
        }

        const deletedRequest = await prisma.requestHistory.delete({
            where: {
                id: targetRequestId,
            },
        });
        return SuccessDelete(deletedRequest);
    } catch (error) {
        console.error('Error deleting request:', error);
        return ServerError();
    }
}
