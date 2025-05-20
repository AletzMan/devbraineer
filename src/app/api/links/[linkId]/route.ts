import prisma from '@/lib/db';
import { Link } from '@prisma/client';
import {
    NotFoundError,
    ServerError,
    UnprocessableEntityError,
} from '@api/_services/errors';
import { SuccessResponse } from '@api/_services/successfulResponses';
import { updateLinkSchema } from '@/lib/schemas/link';
import { ZodError } from 'zod';

// GET /api/links/[linkId]
export async function GET(
    req: Request,
    { params }: { params: Promise<{ linkId: string }> }
) {
    try {
        const targetLinkId = (await params).linkId;

        const link: Link | null = await prisma.link.findUnique({
            where: { id: targetLinkId },
        });

        if (!link) {
            return NotFoundError();
        }

        return SuccessResponse(link);
    } catch (error) {
        console.error('Error fetching link details:', error);
        return ServerError();
    }
}
// DELETE /api/links/[linkId]
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ linkId: string }> }
) {
    try {
        const targetLinkId = (await params).linkId;

        const link: Link | null = await prisma.link.findUnique({
            where: { id: targetLinkId },
        });

        if (!link) {
            return NotFoundError();
        }

        await prisma.link.delete({
            where: { id: targetLinkId },
        });
        return SuccessResponse(null);
    } catch (error) {
        console.error('Error deleting link:', error);
        return ServerError();
    }
}

// PUT /api/links/[linkId]
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ linkId: string }> }
) {
    try {
        const targetLinkId = (await params).linkId;
        const { url, title, description, category, thumbnailUrl, tags } =
            await req.json();

        const validatedData = updateLinkSchema.parse({
            url,
            title,
            description,
            category,
            thumbnailUrl,
            tags,
        });
        const {
            url: validatedUrl,
            title: validatedTitle,
            description: validatedDescription,
            category: validatedCategory,
            thumbnailUrl: validatedThumbnailUrl,
            tags: validatedTags,
        } = validatedData;

        const link: Link | null = await prisma.link.findUnique({
            where: { id: targetLinkId },
        });

        if (!link) {
            return NotFoundError();
        }

        const updatedLink: Link = await prisma.link.update({
            where: { id: targetLinkId },
            data: {
                url: validatedUrl || link.url,
                title: validatedTitle || link.title,
                description: validatedDescription || link.description,
                category: validatedCategory || link.category,
                thumbnailUrl: validatedThumbnailUrl || link.thumbnailUrl,
                tags: validatedTags || link.tags,
            },
        });
        return SuccessResponse(updatedLink);
    } catch (error) {
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues);
        }
        console.error('Error updating link:', error);
        return ServerError();
    }
}
