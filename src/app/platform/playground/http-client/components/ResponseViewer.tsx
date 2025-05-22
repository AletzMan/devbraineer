import JsonView from '@uiw/react-json-view';
import { monokaiTheme } from '@uiw/react-json-view/monokai';

interface ResponseViewerProps {
    response: {
        status: number;
        statusText: string;
        headers: { [key: string]: string };
        body: any;
        time: number;
        size: number;
    };
}

export function ResponseViewer({ response }: ResponseViewerProps) {
    if (!response) return <p className="text-gray-400 italic">Aún no se ha enviado ninguna solicitud.</p>;

    const { status, statusText, headers, body, time, size } = response;

    const statusColor =
        status >= 200 && status < 300 ? 'badge-success' : status >= 400 ? 'badge-error' : 'badge-warning';

    const isObject = (val: any) => val !== null && typeof val === 'object' && !Array.isArray(val);

    const safeHeaders = (() => {
        if (typeof headers === 'object' && headers !== null) {
            try {
                // Algunos headers pueden tener valores que no son string,
                // mejor forzar todo a string para evitar problemas
                return Object.fromEntries(Object.entries(headers).map(([k, v]) => [k, String(v)]));
            } catch {
                return {};
            }
        }
        return {};
    })();

    function looksLikeHTML(str: string) {
        return /<\/?[a-z][\s\S]*>/i.test(str);
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm mt-2">
                {/* STATUS */}
                <div className="flex items-center gap-1">
                    <span className="font-semibold text-base-content">Status:</span>{' '}
                    <span className={`badge badge-soft  font-bold ${statusColor}`}>
                        {status} {statusText}
                    </span>
                </div>

                {/* TIEMPO */}
                <div className="flex items-center gap-1">
                    <span className="font-semibold text-base-content">Duración:</span>
                    <span className="badge badge-outline text-info">{time.toFixed(2)} ms</span>
                </div>

                {/* TAMAÑO */}
                <div className="flex items-center gap-1">
                    <span className="font-semibold text-base-content">Tamaño:</span>
                    <span className="badge badge-outline text-accent">{size} KB</span>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-1">Headers</h3>
                <div className="bg-base-200 p-3 rounded">
                    <JsonView value={safeHeaders} style={monokaiTheme} />
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-1">Body</h3>
                <div className="bg-base-200 p-3 rounded">
                    {isObject(body) && !looksLikeHTML(body) ? (
                        <JsonView value={body} style={monokaiTheme} />
                    ) : (
                        <pre className="whitespace-pre-wrap">{String(body)}</pre>
                    )}
                </div>
            </div>
        </div>
    );
}
