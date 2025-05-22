'use client';

import Link from 'next/link';
import { Mail, Phone, MessageSquare, MapPin, ArrowRight, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Logo, NameLogo } from '../components/Logo';
import { FloatingHomeButton } from '../components/FloatingHomeButton';
import styles from '../home.module.css';

export default function Contact() {
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0d1220] to-zinc-950 text-neutral-content antialiased"
            data-theme="dark">
            <FloatingHomeButton />
            <div className="min-h-screen">
                <div
                    className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0d1220] to-zinc-950 text-neutral-content antialiased"
                    data-theme="dark">
                    {/* Hero Section */}
                    <div className="hero min-h-svh relative">
                        <div className="hero-overlay bg-gradient-radial from-neutral-950/50 via-[#1a2035]/60 to-transparent opacity-90"></div>
                        <div className="hero-overlay bg-black/40"></div>
                        <div className="hero-content text-center py-20 md:py-32 relative z-10">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex flex-col items-center justify-center mb-12">
                                    <Logo className="size-24 md:size-30 text-primary group-hover:${styles.spinSlow}" />
                                    <NameLogo className="w-70 md:w-130 text-warning stroke-2 group-hover:${styles.spinSlow}" />
                                </div>
                                <h2 className="mb-8 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-xl">
                                    Contáctanos
                                </h2>
                                <p className="mb-10 text-md md:text-xl lg:text-2xl text-neutral-200 max-w-3xl mx-auto drop-shadow-md">
                                    ¿Tienes alguna pregunta o sugerencia? No dudes en ponerte en contacto con nosotros.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Methods */}
                    <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-[#111827] to-[#0c1322]">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Email */}
                                <div className="card bg-neutral-900/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-neutral-700/70 hover:border-primary group">
                                    <div className="card-body items-center text-center p-8">
                                        <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Mail className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="card-title text-xl font-semibold text-white mb-4">Email</h3>
                                        <p className="text-neutral-400 mb-4">Para consultas generales</p>
                                        <a
                                            href="mailto:alejandro.ga.dev@gmail.com"
                                            className="btn btn-outline btn-primary rounded-full hover:text-white w-full sm:w-auto">
                                            alejandro.ga.dev@gmail.com
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </a>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="card bg-neutral-900/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-neutral-700/70 hover:border-accent group">
                                    <div className="card-body items-center text-center p-8">
                                        <div className="p-4 bg-gradient-to-br from-accent to-warning rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <MessageSquare className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="card-title text-xl font-semibold text-white mb-4">
                                            Redes Sociales
                                        </h3>
                                        <div className="space-y-4 mt-4">
                                            <a
                                                href="https://github.com/AletzMan"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline btn-accent rounded-full hover:text-white w-full sm:w-auto">
                                                <Github className="w-5 h-5 mr-2" />
                                                GitHub
                                            </a>
                                            <a
                                                href="https://linkedin.com/in/aletzman"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline btn-accent rounded-full hover:text-white w-full sm:w-auto">
                                                <Linkedin className="w-5 h-5 mr-2" />
                                                LinkedIn
                                            </a>
                                            <a
                                                href="https://twitter.com/AletzMan"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline btn-accent rounded-full hover:text-white w-full sm:w-auto">
                                                <Twitter className="w-5 h-5 mr-2" />
                                                Twitter
                                            </a>
                                            <a
                                                href="https://instagram.com/aletzman"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline btn-accent rounded-full hover:text-white w-full sm:w-auto">
                                                <Instagram className="w-5 h-5 mr-2" />
                                                Instagram
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Support */}
                                <div className="card bg-neutral-900/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-neutral-700/70 hover:border-info group">
                                    <div className="card-body items-center text-center p-8">
                                        <div className="p-4 bg-gradient-to-br from-info to-accent rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Phone className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="card-title text-xl font-semibold text-white mb-4">
                                            Soporte Técnico
                                        </h3>
                                        <p className="text-neutral-400 mb-4">Para problemas técnicos</p>
                                        <a
                                            href="mailto:support@devbraineer.com"
                                            className="btn btn-outline btn-info rounded-full hover:text-white w-full sm:w-auto">
                                            support@devbraineer.com
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact Form */}
                    <section className="py-20 md:py-32 bg-gradient-to-b from-[#0c1322] via-[#0A0F1A] to-black">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold text-white mb-6">Envíanos un mensaje</h2>
                                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                                    ¿Tienes alguna pregunta o sugerencia? No dudes en ponerte en contacto con nosotros.
                                </p>
                            </div>
                            <div className="max-w-2xl mx-auto">
                                <form className="space-y-6">
                                    <div>
                                        <label className="label">
                                            <span className="label-text text-neutral-300">Nombre</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Tu nombre"
                                            className="input input-bordered w-full bg-base-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text text-neutral-300">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Tu email"
                                            className="input input-bordered w-full bg-base-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text text-neutral-300">Mensaje</span>
                                        </label>
                                        <textarea
                                            placeholder="Escribe tu mensaje..."
                                            className="textarea textarea-bordered w-full bg-base-100 min-h-[150px]"></textarea>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-primary rounded-full hover:scale-105 transform-gpu transition-transform duration-300 ease-in-out">
                                            Enviar mensaje
                                            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
