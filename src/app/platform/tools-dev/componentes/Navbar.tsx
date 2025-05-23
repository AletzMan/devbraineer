import Link from 'next/link';
import { Menu, ChevronDown, Search, Bell, User, Sparkles } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-base-100 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/platform/tools-dev" className="flex items-center space-x-2">
                            <Sparkles className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold">Dev Tools</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="/platform/tools-dev/gradient-generator" className="flex items-center space-x-2">
                            <span>Generador de Gradientes</span>
                        </Link>
                        <Link href="/platform/tools-dev/uuid-generator" className="flex items-center space-x-2">
                            <span>Generador de UUIDs</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
