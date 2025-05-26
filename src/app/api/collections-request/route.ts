import prisma from '@/lib/db';
import { SuccessCreate, SuccessDelete, SuccessResponse } from '@/app/api/_services/successfulResponses';
import { auth } from '@clerk/nextjs/server';
import { NotAuthorizedError, NotFoundError, ServerError, UnprocessableEntityError } from '@/app/api/_services/errors';
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
        const body = await request.json();
        const { name, request: requestData } = createCollectionSchema.parse(body);

        const { userId } = await auth();
        if (!userId) {
            return NotAuthorizedError();
        }

        let newRequest = null;

        // Si hay datos de request, crea la nueva request
        if (requestData) {
            newRequest = await prisma.requestHistory.create({
                data: {
                    method: requestData.method,
                    url: requestData.url,
                    headers: requestData.headers || '',
                    body: requestData.body || '',
                    response: requestData.response || '',
                    user: { connect: { id: userId } },
                },
            });
        }

        // Verifica si ya existe una colección con ese nombre y usuario
        const existingCollection = await prisma.collection.findFirst({
            where: {
                name,
                userId,
            },
        });

        let collection;

        if (existingCollection) {
            // Si ya existe, conéctale la nueva request
            if (newRequest) {
                collection = await prisma.collection.update({
                    where: { id: existingCollection.id },
                    data: {
                        requests: {
                            connect: { id: newRequest.id },
                        },
                    },
                    include: { requests: true },
                });
            } else {
                // Si no hay nueva request, simplemente devuelve la colección existente
                collection = existingCollection;
            }
        } else {
            // Si no existe, crea una nueva colección
            collection = await prisma.collection.create({
                data: {
                    name,
                    userId,
                    ...(newRequest && {
                        requests: {
                            connect: { id: newRequest.id },
                        },
                    }),
                },
                include: { requests: true },
            });
        }

        return SuccessCreate(collection);
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
        if (deletedCollections.count > 0) {
            return SuccessDelete(deletedCollections);
        }
        return NotFoundError();
    } catch (error) {
        console.error('Error deleting collections:', error);
        return ServerError();
    }
}
