import { Github, LinkIcon } from 'lucide-react';

export const SiteFooter = () => {
    return (
        <footer className="mt-8 border-t border-base-300 pt-4 text-sm text-center text-gray-500 space-y-2">
            <div>
                © {new Date().getFullYear()} DevBraineer&nbsp;·&nbsp;
                Construye, prueba y aprende con confianza.
            </div>
            <div className="flex justify-center gap-4 text-gray-400">
                <a
                    href="https://github.com/AletzMan/devbraineer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                    aria-label="GitHub">
                    <Github className="w-5 h-5" />
                </a>
                <a
                    href="https://alejandro-garcia.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition flex items-center gap-1 text-sm"
                    aria-label="Sitio personal">
                    <LinkIcon className="w-4 h-4" />
                </a>
            </div>
        </footer>
    );
};
