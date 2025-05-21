import ReactJson from 'react-json-view';

interface ResponseViewerProps {
    response: {
        status: number;
        statusText: string;
        headers: { [key: string]: string };
        body: any;
    };
}

export function ResponseViewer({ response }: ResponseViewerProps) {
    if (!response)
        return (
            <p className="text-gray-400 italic">
                Aún no se ha enviado ninguna solicitud.
            </p>
        );

    const { status, statusText, headers, body } = response;

    const statusColor =
        status >= 200 && status < 300
            ? 'text-green-600'
            : status >= 400
              ? 'text-red-600'
              : 'text-yellow-600';

    const isObject = (val: any) =>
        val !== null && typeof val === 'object' && !Array.isArray(val);

    const safeHeaders = (() => {
        if (typeof headers === 'object' && headers !== null) {
            try {
                // Algunos headers pueden tener valores que no son string,
                // mejor forzar todo a string para evitar problemas
                return Object.fromEntries(
                    Object.entries(headers).map(([k, v]) => [k, String(v)])
                );
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
            <div className="text-sm">
                <span className="font-semibold">Status: </span>
                <span className={`font-bold ${statusColor}`}>
                    {status} {statusText}
                </span>
            </div>

            <div>
                <h3 className="font-semibold mb-1">Headers</h3>
                <div className="bg-base-200 p-3 rounded">
                    <ReactJson
                        src={safeHeaders}
                        name={false}
                        collapsed={true}
                        enableClipboard={false}
                        displayDataTypes={false}
                        theme="codeschool"
                    />
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-1">Body</h3>
                <div className="bg-base-200 p-3 rounded">
                    {isObject(body) && !looksLikeHTML(body) ? (
                        <ReactJson
                            src={body}
                            name={false}
                            collapsed={false}
                            enableClipboard={true}
                            displayDataTypes={false}
                            theme="codeschool"
                        />
                    ) : (
                        <pre className="whitespace-pre-wrap">
                            {String(body)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
}
