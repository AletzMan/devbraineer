import JsonView from '@uiw/react-json-view';
import { monokaiTheme } from '@uiw/react-json-view/monokai';
import { themes } from 'prism-react-renderer';
import { CodeBlock } from 'react-code-block';

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

    const looksLikeHTML = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);
    const looksLikeXML = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);
    const isXML = looksLikeXML(body);
    console.log(body);
    console.log(isXML);

    const isArray = Array.isArray(body);

    return (
        <div className="space-y-4 h-full">
            <div className="flex flex-wrap items-center gap-3 text-sm bg-base-200 p-2 rounded-sm">
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
            <div className=" bg-base-200 rounded-sm px-2 pb-2 h-full ">
                <div className="tabs tabs-border h-full">
                    <input type="radio" name="my_tabs_2" className="tab" aria-label="Body" defaultChecked />
                    <div className="tab-content border-base-300 bg-base-100 p-5 h-full">
                        <div className="h-full">
                            <h3 className="font-semibold mb-1">Body</h3>
                            <div className="bg-base-200 p-3 rounded h-full">
                                {isObject(body) && !looksLikeHTML(body) && !looksLikeXML(body) ? (
                                    <div className="h-full overflow-y-auto scrollbar-thin">
                                        <JsonView value={body} style={monokaiTheme} />
                                    </div>
                                ) : (
                                    <CodeBlock
                                        code={String(body)}
                                        language={isArray ? 'json' : looksLikeXML(body) ? 'xml' : 'html'}
                                        theme={themes.oneDark}>
                                        <div className="relative overflow-hidden h-full">
                                            <CodeBlock.Code className="bg-neutral-900 overflow-hidden h-full p-4 rounded-b-sm shadow-lg border-1 border-gray-800 overflow-y-auto scrollbar-thin">
                                                <div className="table-row">
                                                    <CodeBlock.LineContent className="table-cell">
                                                        <CodeBlock.Token />
                                                    </CodeBlock.LineContent>
                                                </div>
                                            </CodeBlock.Code>
                                        </div>
                                    </CodeBlock>
                                )}
                            </div>
                        </div>
                    </div>
                    <input type="radio" name="my_tabs_2" className="tab" aria-label="Headers" />
                    <div className="tab-content border-base-300 bg-base-100 p-5">
                        <div>
                            <h3 className="font-semibold mb-1">Headers</h3>
                            <div className="bg-base-200 p-3 rounded">
                                <JsonView value={safeHeaders} style={monokaiTheme} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
