import prisma from '@/lib/db';
import { SuccessCreate, SuccessDelete, SuccessResponse } from '@/app/api/_services/successfulResponses';
import { auth } from '@clerk/nextjs/server';
import { NotAuthorizedError, ServerError, UnprocessableEntityError } from '@/app/api/_services/errors';
import { createCollectionSchema } from '@/lib/schemas/collection.schema';
import { ZodError } from 'zod';

export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NotAuthorizedError();
        }
        const collections = await prisma.collection.findMany({
            where: {
                userId,
            },
            include: {
                requests: { orderBy: { created_at: 'desc' } },
            },
        });
        return SuccessResponse(collections);
    } catch (error) {
        console.error('Error al obtener las colecciones:', error);
        return ServerError();
    }
}

export async function POST(request: Request) {
    try {
        const {
            request: { method, url, headers, body, response },
            name,
        } = await request.json();
        const { userId } = await auth();

        if (!userId) {
            return NotAuthorizedError();
        }

        const dataValidation = createCollectionSchema.parse({
            method,
            url,
            headers,
            body,
            response,
            name,
        });

        const newRequest = await prisma.requestHistory.create({
            data: {
                method: dataValidation.method,
                url: dataValidation.url,
                headers: dataValidation.headers,
                body: dataValidation.body,
                response: dataValidation.response,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        const collection = await prisma.collection.create({
            data: {
                name,
                userId,
                requests: {
                    connect: {
                        id: newRequest.id,
                    },
                },
            },
            include: {
                requests: true,
            },
        });
        console.log(collection);
        if (collection) {
            return SuccessCreate(collection);
        }
        return ServerError();
    } catch (error) {
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues);
        }
        console.error('Error al crear la colección:', error);
        return ServerError();
    }
}

export async function DELETE(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NotAuthorizedError();
        }
        const deletedCollections = await prisma.collection.deleteMany({
            where: {
                userId,
            },
        });
        return SuccessDelete(deletedCollections);
    } catch (error) {
        console.error('Error deleting collections:', error);
        return ServerError();
    }
}
