import { auth } from '@clerk/nextjs/server';
import { NotAuthorizedError, NotFoundError, UnprocessableEntityError } from '../../_services/errors';
import prisma from '@/lib/db';
import { SuccessResponse, SuccessUpdate } from '../../_services/successfulResponses';
import { ServerError } from '../../_services/errors';
import { updateNoteSchema } from '@/lib/schemas/note';
import { ZodError } from 'zod';

export async function GET(req: Request) {
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

        return SuccessResponse(note);
    } catch (error) {
        console.error('Error fetching note:', error);
        return ServerError();
    }
}

// DELETE /api/notes/:id
export async function DELETE(req: Request, { params }: { params: Promise<{ noteId: string }> }) {
    const { userId } = await auth();

    if (!userId) {
        return NotAuthorizedError();
    }

    try {
        const noteId = (await params).noteId;
        if (!noteId) {
            return UnprocessableEntityError([{ message: 'ID is required' }]);
        }

        const note = await prisma.note.findUnique({
            where: { id: noteId },
        });

        if (!note) {
            return NotFoundError();
        }

        await prisma.note.delete({
            where: { id: noteId },
        });

        return SuccessResponse({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        return ServerError();
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ noteId: string }> }) {
    const { userId } = await auth();

    if (!userId) {
        return NotAuthorizedError();
    }

    try {
        const noteId = (await params).noteId;
        if (!noteId) {
            return UnprocessableEntityError([{ message: 'ID is required' }]);
        }

        const validatedNote = updateNoteSchema.parse(await req.json());

        const note = await prisma.note.findUnique({
            where: { id: noteId },
        });

        if (!note) {
            return NotFoundError();
        }

        const updatedNote = await prisma.note.update({
            where: { id: noteId },
            data: validatedNote,
        });
        if (updatedNote) {
            return SuccessUpdate(updatedNote);
        }
        return NotFoundError();
    } catch (error) {
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues);
        }
        console.error('Error updating note:', error);
        return ServerError();
    }
}
