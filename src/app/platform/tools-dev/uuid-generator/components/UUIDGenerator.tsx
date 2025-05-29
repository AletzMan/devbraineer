'use client';
import { useState } from 'react';
import { Copy, RefreshCw, Download, Clipboard, Trash, BrushCleaning, Check, CheckCircle } from 'lucide-react';

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

    const handleReset = () => {
        setUUID('');
        setCount(1);
        setFormat('string');
    };

    return (
        <div className=" bg-base-100 shadow-xl">
            <div className="">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 bg-base-200 p-2 rounded-sm">
                        <label className="label flex flex-col items-start">
                            <span className="label-text text-sm">Formato:</span>
                            <select
                                value={format}
                                onChange={(e) => setFormat(e.target.value as 'string' | 'number' | 'hex' | 'buffer')}
                                className="select select-bordered">
                                <option value="string">String</option>
                                <option value="number">Number</option>
                                <option value="hex">Hex</option>
                                <option value="buffer">Buffer</option>
                            </select>
                        </label>

                        <label className="label flex flex-col items-start">
                            <span className="label-text text-sm">Cantidad:</span>
                            <input
                                type="number"
                                value={count}
                                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value))))}
                                min="1"
                                max="100"
                                className="input input-bordered"
                            />
                        </label>
                    </div>
                    <div className="flex gap-2 bg-base-200 p-2 rounded-sm">
                        <button onClick={generateUUID} className="btn btn-primary flex-1">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Generar UUID
                        </button>
                    </div>
                    {
                        <div className="relative flex flex-col gap-2">
                            <div className="absolute top-2 right-2 flex gap-2">
                                <div className="tooltip" data-tip="Copiar">
                                    <button onClick={handleCopy} className="btn btn-xs btn-secondary">
                                        {copied ? <CheckCircle className="size-4" /> : <Copy className="size-4" />}
                                    </button>
                                </div>
                                <div className="tooltip" data-tip="Descargar">
                                    <button
                                        onClick={handleDownload}
                                        className="btn btn-xs btn-info"
                                        disabled={isDownloading || !uuid}>
                                        <Download className="size-4" />
                                    </button>
                                </div>
                                <div className="tooltip" data-tip="Reset">
                                    <button onClick={handleReset} className="btn btn-xs btn-warning">
                                        <BrushCleaning className="size-4" />
                                    </button>
                                </div>
                            </div>
                            <pre className="p-4 pt-10 bg-base-200 text-sm rounded-lg overflow-x-auto min-h-[10rem]">
                                {uuid}
                            </pre>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
