import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { Note } from '@prisma/client';
import { SuccessCreate, SuccessResponse } from '../_services/successfulResponses';
import { NotAuthorizedError, ServerError, UnprocessableEntityError } from '../_services/errors';
import { ZodError } from 'zod';
import { createNoteSchema } from '@/lib/schemas/note';

// GET /api/notes
export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NotAuthorizedError();
        }

        const notes: Note[] = await prisma.note.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return SuccessResponse(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        return ServerError();
    }
}

// POST /api/notes
export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NotAuthorizedError();
    }
    try {
        const { title, content, color } = await req.json();

        const noteData = createNoteSchema.parse({
            title,
            content,
            color,
            userId,
        });

        const note = await prisma.note.create({
            data: noteData,
        });

        return SuccessCreate(note);
    } catch (error) {
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.errors);
        }
        console.error('Error creating note:', error);
        return ServerError();
    }
}
