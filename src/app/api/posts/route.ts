import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { PostType, Post } from "@prisma/client";
import { NotAuthorizedError, ServerError } from "../_services/errors";
import { SuccessCreate, SuccessResponse } from "../_services/successfulResponses";

// Crea una nueva publicación (Post) 
export async function POST(req: Request) {

    const { userId } = await auth();

    if (!userId) {
        return NotAuthorizedError();
    }

    try {
        const {
            type,
            title,
            description,
            language,
            code_snippet,
            url,
            pollOptions,
        } = await req.json();

        // --- Validaciones básicas --- 
        if (!title || !description || !type) {
            return new NextResponse("Missing required fields (title, description, type)", { status: 400 });
        }

        // Valida si el 'type' recibido es uno válido del enum PostType definido en Prisma.
        if (!Object.values(PostType).includes(type)) {
            return new NextResponse(`Invalid post type: ${type}`, { status: 400 });
        }

        // --- Validaciones específicas para ENCUESTAS (POLL) ---
        // Si el tipo es POLL, requerimos que 'pollOptions' sea un array válido y no esté vacío.
        if (type === PostType.Poll) {
            // Verifica si pollOptions no es un array o si tiene menos de 2 opciones (una encuesta necesita al menos 2).
            if (!Array.isArray(pollOptions) || pollOptions.length < 2) {
                return new NextResponse("Polls require at least two options in 'pollOptions' array", { status: 400 });
            }
            // Opcional: Valida que ninguna opción de la encuesta sea una cadena vacía o solo espacios.
            if (pollOptions.some((option: any) => typeof option !== 'string' || option.trim() === '')) {
                return new NextResponse("Poll options cannot be empty strings", { status: 400 });
            }
        }

        // --- Creación de la publicación en la base de datos --- 
        const newPost: Post = await prisma.post.create({
            data: {
                type: type as PostType,
                title,
                description,
                language,
                code_snippet,
                url,
                pollOptions: pollOptions && type === PostType.Poll ? pollOptions : [],
                publisherId: userId,
            },
        });

        return SuccessCreate(newPost);

    } catch (error) {
        console.error("Error publishing post:", error);
        return ServerError();
    }
}


// Obtiene una lista de todas las publicaciones (Posts). 
export async function GET(req: Request) {
    try {
        // Usa prisma.post.findMany para obtener todas las publicaciones de la tabla 'posts'.
        // Incluye información básica del publicador (username, ciudad, país, avatar) para mostrar en la lista.
        const posts: Post[] = await prisma.post.findMany({
            orderBy: {
                created_at: 'desc',
            },
            include: {
                // Incluye la relación 'publisher' (el usuario que publicó).
                publisher: {
                    select: {
                        username: true,
                        // Incluye el perfil del publicador para obtener datos geográficos y avatar.
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
