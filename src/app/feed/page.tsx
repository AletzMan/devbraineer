'use client';

import { useUser } from '@clerk/nextjs';
import { cloneElement, ReactSVGElement, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Post, PostType } from '@prisma/client';

import { CalendarIcon, ChartBarIcon, CircleHelp, CodeIcon, LightbulbIcon, MessageSquarePlus } from 'lucide-react';
import { TypePost } from '@/lib/constants';
import CreatePost from '../components/CreatePost';

// Define un tipo para el Post incluyendo la relación con el publicador
type PostWithPublisher = Post & {
    publisher: {
        username: string | null;
        profile: {
            city: string | null;
            country: string | null;
            avatar_url: string | null;
        } | null;
    } | null;
};

export default function HomePage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState<PostWithPublisher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const refTypePost = useRef<PostType>('Question');

    useEffect(() => {
        if (isLoaded) {
            if (isSignedIn) {
                const fetchPosts = async () => {
                    try {
                        setLoading(true);
                        setError(null);

                        const response = await axios.get('/api/posts');

                        if (response.data && response.data.error === false) {
                            setPosts(response.data.response);
                        } else if (Array.isArray(response.data)) {
                            setPosts(response.data);
                        } else {
                            console.error('Unexpected API response format:', response.data);
                            setError('Failed to load posts due to unexpected response format.');
                        }
                    } catch (err: any) {
                        console.error('Error fetching posts:', err);
                        setError('Failed to load posts. Please try again later.');
                    } finally {
                        setLoading(false);
                    }
                };

                fetchPosts();
            } else {
                setLoading(false);
            }
        }
    }, [isLoaded, isSignedIn]);

    const handleCreatePost = (type: PostType) => {
        refTypePost.current = type;
        setOpen(true);
    };

    if (!isLoaded) {
        return <div className="p-4 text-center text-gray-400">Cargando usuario...</div>;
    }

    if (!isSignedIn) {
        return (
            <div className="p-8 text-center flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <h1 className="text-4xl font-bold mb-6">Bienvenido a DevBraineer</h1>
                <p className="text-xl mb-8">La red social para ingenieros y desarrolladores.</p>
                <Link
                    href="/sign-in"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out">
                    Únete o Inicia Sesión
                </Link>
                <p className="mt-4 text-gray-400">Conecta, aprende y comparte conocimiento técnico.</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto bg-(--color-base-300) text-white min-h-screen border-l-1 border-r-1 border-(--color-base-100)">
            <header className="flex justify-between items-center px-4 py-2 border-b-1 border-(--color-base-100) ">
                <h1 className="text-2xl font-bold text-center text-(--color-base-content)">Feed de Publicaciones</h1>
                <div className="dropdown dropdown-bottom dropdown-end">
                    <button tabIndex={0} className="btn btn-primary m-1">
                        <MessageSquarePlus size={22} />
                        Create Post
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li>
                            <button onClick={() => handleCreatePost('Challenge')}>
                                <CodeIcon /> Reto
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleCreatePost('Resource')}>
                                <LightbulbIcon /> Recurso
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleCreatePost('Question')}>
                                <CircleHelp />
                                Pregunta
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleCreatePost('EventMeetup')}>
                                <CalendarIcon />
                                Evento
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleCreatePost('Poll')}>
                                <ChartBarIcon />
                                Encuesta
                            </button>
                        </li>
                    </ul>
                </div>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open={open}>
                    <div className="modal-box bg-(--color-base-300) border-l-1 border-r-1 border-(--color-base-100)">
                        <div className="modal-action mt-0">
                            <CreatePost type={refTypePost.current} onClose={() => setOpen(false)} />
                        </div>
                    </div>
                </dialog>
            </header>

            {loading && <div className="text-center text-gray-400">Cargando publicaciones...</div>}
            {error && <div className="text-center text-red-500">Error: {error}</div>}

            {!loading && !error && posts.length > 0 && (
                <div className="">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="flex flex-col p-4 shadow-md border-b-1 border-(--color-base-100) bg-(--color-base-300)">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex gap-1.5 items-center">
                                    {post.publisher?.profile?.avatar_url && (
                                        <img
                                            src={post.publisher.profile.avatar_url}
                                            alt={post.publisher.username || 'User'}
                                            className="w-10 h-10 rounded-full mr-4 object-cover"
                                        />
                                    )}
                                    {!post.publisher?.profile?.avatar_url && (
                                        <div className="avatar avatar-placeholder">
                                            <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                                <span>{post.publisher?.username?.split('')[0].toUpperCase()}</span>
                                            </div>
                                        </div>
                                    )}
                                    <Link
                                        href={`/profile/${post.publisherId}`}
                                        className="font-semibold text-blue-300 hover:underline">
                                        {post.publisher?.username || 'Usuario Desconocido'}
                                    </Link>
                                </div>
                                {post.publisher?.profile?.city && post.publisher?.profile?.country && (
                                    <span className="text-sm text-gray-500 ml-2">
                                        ({post.publisher.profile.city}, {post.publisher.profile.country})
                                    </span>
                                )}
                                <div
                                    className={`self-end place-self-start badge badge-soft rounded-md py-1 ${
                                        post.type === PostType.Challenge
                                            ? 'badge-warning'
                                            : post.type === PostType.Question
                                              ? 'badge-info'
                                              : post.type === PostType.Resource
                                                ? 'badge-success'
                                                : post.type === PostType.EventMeetup
                                                  ? 'badge-secondary'
                                                  : post.type === PostType.Poll
                                                    ? 'badge-accent'
                                                    : 'badge-primary'
                                    }`}>
                                    {cloneElement(TypePost[PostType[post.type]].icon as ReactSVGElement, {
                                        className: 'size-4',
                                    })}
                                    <div className="text-xs">{`  ${post.type}`}</div>
                                </div>
                            </div>
                            <div className="flex flex-col pl-12">
                                <h2 className="text-xl font-bold mb-2 text-gray-200 hover:underline">
                                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                                </h2>

                                <p className="text-gray-400 mb-4">
                                    {post.description.substring(0, 150)}
                                    {post.description.length > 150 ? '...' : ''}
                                </p>
                            </div>

                            {post.type === PostType.Challenge && post.language && (
                                <p className="text-sm text-gray-400 mb-2">Lenguaje: {post.language}</p>
                            )}
                            {post.type === PostType.Resource && post.url && (
                                <p className="text-sm text-gray-400 mb-2">
                                    Recurso:{' '}
                                    <a
                                        href={post.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline">
                                        {post.url}
                                    </a>
                                </p>
                            )}
                            {post.type === PostType.EventMeetup && post.url && (
                                <p className="text-sm text-gray-400 mb-2">
                                    Evento:{' '}
                                    <a
                                        href={post.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline">
                                        {post.url}
                                    </a>
                                </p>
                            )}
                            {post.type === PostType.Poll && post.pollOptions && post.pollOptions.length > 0 && (
                                <div className="mt-4">
                                    <p className="font-semibold text-gray-400 mb-2">Opciones de Encuesta:</p>
                                    <ul className="list-disc list-inside text-gray-300">
                                        {post.pollOptions.map((option, index) => (
                                            <li key={index}>{option}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <p className="text-xs text-gray-600 text-right">
                                Publicado el: {new Date(post.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && posts.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    Aún no hay publicaciones. ¡Sé el primero en crear una!
                </div>
            )}
        </div>
    );
}
