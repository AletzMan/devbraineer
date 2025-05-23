'use client';
import { useState } from 'react';
import { Copy, RefreshCw, Download, Clipboard } from 'lucide-react';

export default function UUIDGenerator() {
    const [uuid, setUUID] = useState('');
    const [copied, setCopied] = useState(false);
    const [format, setFormat] = useState<'string' | 'number' | 'hex' | 'buffer'>('string');
    const [count, setCount] = useState(1);
    const [isDownloading, setIsDownloading] = useState(false);

    const generateUUID = () => {
        const uuids = Array.from({ length: count }, () => crypto.randomUUID());
        setUUID(uuids.join('\n'));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(uuid);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const blob = new Blob([uuid], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `uuids-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Copy className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Generador de UUIDs</h2>
                </div>
                <p className="text-sm text-muted-foreground">Crea identificadores únicos de forma rápida y segura</p>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <button onClick={generateUUID} className="btn btn-primary flex-1">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Generar UUID
                            </button>
                            <button onClick={handleCopy} className="btn btn-secondary flex-1">
                                {copied ? 'Copiado!' : <Copy className="h-4 w-4 mr-2" />}
                                Copiar
                            </button>
                            <button
                                onClick={handleDownload}
                                className="btn btn-ghost flex-1"
                                disabled={isDownloading || !uuid}>
                                <Download className="h-4 w-4 mr-2" />
                                Descargar
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="label-text">Formato:</span>
                                <select
                                    value={format}
                                    onChange={(e) =>
                                        setFormat(e.target.value as 'string' | 'number' | 'hex' | 'buffer')
                                    }
                                    className="select select-bordered">
                                    <option value="string">String</option>
                                    <option value="number">Number</option>
                                    <option value="hex">Hex</option>
                                    <option value="buffer">Buffer</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="label-text">Cantidad:</span>
                                <input
                                    type="number"
                                    value={count}
                                    onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value))))}
                                    min="1"
                                    max="100"
                                    className="input input-bordered"
                                />
                            </div>
                        </div>

                        {uuid && (
                            <div className="flex flex-col gap-2">
                                <pre className="p-4 bg-base-200 rounded-lg overflow-x-auto">{uuid}</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
