import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { Note } from '@prisma/client';
import { SuccessCreate, SuccessResponse } from '../_services/successfulResponses';
import { NotAuthorizedError, ServerError, UnprocessableEntityError } from '../_services/errors';
import { createNoteSchema } from '@/lib/schemas/note';
import { ZodError } from 'zod';

// GET /api/notes
export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NotAuthorizedError();
        }

        const notes: Note[] = await prisma.note.findMany({
            where: {
                userId: userId,
            },
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
        const { title, content } = await req.json();
        
        const noteData = createNoteSchema.parse({
            title,
            content,
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

// DELETE /api/notes/:id
export async function DELETE(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NotAuthorizedError();
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return UnprocessableEntityError([{ message: 'ID is required' }]);
        }

        const note = await prisma.note.findUnique({
            where: { id },
        });

        if (!note || note.userId !== userId) {
            return NotAuthorizedError();
        }

        await prisma.note.delete({
            where: { id },
        });

        return SuccessResponse({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        return ServerError();
    }
}
