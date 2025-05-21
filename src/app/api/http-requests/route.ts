import prisma from '@/lib/db';
import {
    SuccessCreate,
    SuccessResponse,
} from '../_services/successfulResponses';
import { NotAuthorizedError, ServerError } from '../_services/errors';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NotAuthorizedError();
        }
        const requests = await prisma.requestHistory.findMany({
            where: {
                user: {
                    id: userId,
                },
            },
        });
        return SuccessResponse(requests);
    } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
        return ServerError();
    }
}

export async function POST(request: Request) {
    try {
        const { method, url, headers, body, response } = await request.json();
        const { userId } = await auth();
        if (!userId) {
            return NotAuthorizedError();
        }
        const newRequest = await prisma.requestHistory.create({
            data: {
                method,
                url,
                headers,
                body,
                response,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return SuccessCreate(newRequest);
    } catch (error) {
        console.error('Error al crear la solicitud:', error);
        return ServerError();
    }
}
