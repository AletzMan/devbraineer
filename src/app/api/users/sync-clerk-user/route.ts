import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { NotAuthorizedError, ServerError } from '@api/_services/errors';
import { SuccessUpdate } from '@api/_services/successfulResponses';

export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NotAuthorizedError();
    }

    try {
        const { email, username } = await req.json();

        const user = await prisma.user.upsert({
            where: { id: userId },
            update: {
                email: email,
                username: username,
            },
            create: {
                id: userId,
                email: email,
                username: username,
            },
        });

        return SuccessUpdate(user);
    } catch (error) {
        console.error('Error syncing Clerk user to Prisma DB:', error);
        return ServerError();
    }
}
