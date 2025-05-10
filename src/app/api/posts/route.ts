import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { PostType, Post } from "@prisma/client";
import { createPostSchemaWithConditionalValidation, CreatePostInput } from "@/lib/schemas/post";
import { ZodError } from 'zod';
import { NotAuthorizedError, ServerError, UnprocessableEntityError } from "../_services/errors";
import { SuccessCreate, SuccessResponse } from "../_services/successfulResponses";

// POST /api/posts
// Crea una nueva publicación (Post). 
export async function POST(req: Request) {

    const { userId } = await auth();

    if (!userId) {
        return NotAuthorizedError();
    }

    try {
        const body = await req.json();


        const validatedData: CreatePostInput = createPostSchemaWithConditionalValidation.parse(body);


        const {
            type,
            title,
            description,
            language,
            code_snippet,
            url,
            pollOptions,
        } = validatedData;

        // --- Creación de la publicación en la base de datos --- 
        const newPost: Post = await prisma.post.create({
            data: {
                type: type,
                title,
                description,
                language,
                code_snippet,
                url,
                // Guarda pollOptions solo si el tipo es POLL y está presente (Zod ya validó que si es POLL, está presente y es array). 
                pollOptions: type === PostType.Poll && pollOptions ? pollOptions : [],
                publisherId: userId,
            },
        });

        // Retorna la publicación recién creada con un estado 201 (Created).
        return SuccessCreate(newPost);

    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Validation Error:", error.errors);
            return UnprocessableEntityError(error.issues);
        }

        console.error("Error publishing post:", error);
        return ServerError();
    }
}

// GET /api/posts
export async function GET(req: Request) {
    try {
        const posts: Post[] = await prisma.post.findMany({
            orderBy: {
                created_at: 'desc',
            },
            include: {
                publisher: {
                    select: {
                        username: true,
                        profile: {
                            select: {
                                city: true,
                                country: true,
                                avatar_url: true,
                            }
                        }
                    }
                }
            }
        });

        return SuccessResponse(posts);

    } catch (error) {
        console.error("Error fetching posts:", error);
        return ServerError();
    }
}
