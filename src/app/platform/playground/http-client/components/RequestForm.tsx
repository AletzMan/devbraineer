'use client';
import { useClerk } from '@clerk/nextjs';
import { Editor } from '@monaco-editor/react';
import { useEffect, useState } from 'react';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

interface RequestFormProps {
    onSend: (request: { method: string; url: string; headers: { [key: string]: string }[]; body: string }) => void;
    sending?: boolean;
}

interface RequestFormProps {
    onSend: (request: { method: string; url: string; headers: { [key: string]: string }[]; body: string }) => void;
    initialValues?: {
        method: string;
        url: string;
        headers: { key: string; value: string }[];
        body: string;
    };
}

export function RequestForm({ onSend, initialValues, sending }: RequestFormProps) {
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('');
    const [headers, setHeaders] = useState<{ key: string; value: string }[]>([{ key: '', value: '' }]);
    const [queryParams, setQueryParams] = useState<{ key: string; value: string }[]>([{ key: '', value: '' }]);
    const [body, setBody] = useState('');
    const [authType, setAuthType] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [basicUser, setBasicUser] = useState('');
    const [basicPass, setBasicPass] = useState('');
    const [activeTab, setActiveTab] = useState('query-params');
    const clerk = useClerk();

    useEffect(() => {
        if (initialValues) {
            setMethod(initialValues.method);
            setUrl(initialValues.url);
            setHeaders(
                initialValues.headers.map((h) => ({
                    key: h.key,
                    value: h.value,
                }))
            );
            setBody(initialValues.body);
        }
    }, [initialValues]);

    const handleSend = () => {
        const updatedHeaders = [...headers];

        if (authType === 'bearer' && authToken) {
            updatedHeaders.push({
                key: 'Authorization',
                value: `Bearer ${authToken}`,
            });
        }

        if (authType === 'basic' && basicUser && basicPass) {
            const credentials = btoa(`${basicUser}:${basicPass}`);
            updatedHeaders.push({
                key: 'Authorization',
                value: `Basic ${credentials}`,
            });
        }
        // Armar la URL con query params
        const urlObj = new URL(url);
        queryParams.forEach((p) => {
            if (p.key) urlObj.searchParams.set(p.key, p.value);
        });

        onSend({
            method,
            url: urlObj.toString(),
            headers: updatedHeaders,
            body,
        });
    };

    return (
        <div className="space-y-4 bg h-full">
            <div className="flex items-center gap-2">
                <div className="inline-grid *:[grid-area:1/1]">
                    <div
                        aria-label="status"
                        className={`status status-xl ${sending ? 'status-warning animate-ping' : 'status-success'}`}></div>
                    <div
                        aria-label="status"
                        className={`status status-xl ${sending ? 'status-warning' : 'status-success'}`}></div>
                </div>

                <select
                    className="select select-bordered w-24"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}>
                    {methods.map((m) => (
                        <option key={m}>{m}</option>
                    ))}
                </select>
                <input
                    type="text"
                    className="input input-bordered flex-1"
                    placeholder="https://api.ejemplo.com/endpoint"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSend} disabled={sending || !url}>
                    Enviar
                </button>
            </div>

            <div className="flex gap-2 flex-col bg-base-200 rounded-sm px-2 pb-2  h-full ">
                <div className="tabs tabs-border">
                    <input
                        type="radio"
                        name="request-tabs"
                        className="tab"
                        aria-label="Query Params"
                        checked={activeTab === 'query-params'}
                        onChange={() => setActiveTab('query-params')}
                    />
                    <input
                        type="radio"
                        name="request-tabs"
                        className="tab"
                        aria-label="Body"
                        checked={activeTab === 'body'}
                        onChange={() => setActiveTab('body')}
                    />

                    <input
                        type="radio"
                        name="request-tabs"
                        className="tab"
                        aria-label="Headers"
                        checked={activeTab === 'headers'}
                        onChange={() => setActiveTab('headers')}
                    />
                    <input
                        type="radio"
                        name="request-tabs"
                        className="tab"
                        aria-label="Auth"
                        checked={activeTab === 'auth'}
                        onChange={() => setActiveTab('auth')}
                    />
                </div>
                <div className="flex flex-col gap-2 px-2 py-2 bg-base-100 rounded-sm h-full">
                    {/* Query Params */}
                    <div className={`${activeTab === 'query-params' ? '' : 'hidden'} h-full`}>
                        <label className="font-semibold">Query Params</label>
                        {queryParams.map((p, i) => (
                            <div className="flex gap-2 my-1" key={i}>
                                <input
                                    type="text"
                                    className="input input-bordered w-1/2"
                                    placeholder="Clave"
                                    value={p.key}
                                    onChange={(e) => {
                                        const newParams = [...queryParams];
                                        newParams[i].key = e.target.value;
                                        setQueryParams(newParams);
                                    }}
                                />
                                <input
                                    type="text"
                                    className="input input-bordered w-1/2"
                                    placeholder="Valor"
                                    value={p.value}
                                    onChange={(e) => {
                                        const newParams = [...queryParams];
                                        newParams[i].value = e.target.value;
                                        setQueryParams(newParams);
                                    }}
                                />
                            </div>
                        ))}
                        <button
                            className="btn btn-sm mt-2"
                            onClick={() => setQueryParams([...queryParams, { key: '', value: '' }])}>
                            + Param
                        </button>
                    </div>
                    {/* Body para POST/PUT */}
                    <div
                        className={`${activeTab === 'body' ? '' : 'hidden'} overflow-x-hidden`}
                        aria-disabled={activeTab !== 'body'}>
                        <label className="font-semibold">Body (JSON)</label>
                        {clerk.loaded && (
                            <div className="h-[180px] max-w-250 w-full">
                                <Editor
                                    value={body}
                                    onChange={(value) => setBody(value || '')}
                                    language="json"
                                    theme="vs-dark"
                                    options={{
                                        readOnly: method !== 'POST' && method !== 'PUT' && method !== 'PATCH',
                                        minimap: {
                                            enabled: false,
                                        },
                                        automaticLayout: true,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    {/* Headers dinámicos */}
                    <div className={activeTab === 'headers' ? '' : 'hidden'}>
                        <label className="font-semibold pl-1">Headers</label>
                        {headers.map((h, i) => (
                            <div className="flex gap-2 my-1" key={i}>
                                <input
                                    type="text"
                                    className="input input-bordered w-1/2"
                                    placeholder="Clave"
                                    value={h.key}
                                    onChange={(e) => {
                                        const newHeaders = [...headers];
                                        newHeaders[i].key = e.target.value;
                                        setHeaders(newHeaders);
                                    }}
                                />
                                <input
                                    type="text"
                                    className="input input-bordered w-1/2"
                                    placeholder="Valor"
                                    value={h.value}
                                    onChange={(e) => {
                                        const newHeaders = [...headers];
                                        newHeaders[i].value = e.target.value;
                                        setHeaders(newHeaders);
                                    }}
                                />
                            </div>
                        ))}
                        <button
                            className="btn btn-sm mt-2"
                            onClick={() => setHeaders([...headers, { key: '', value: '' }])}>
                            + Header
                        </button>
                    </div>

                    {/* Autenticación */}
                    <div className={activeTab === 'auth' ? '' : 'hidden'}>
                        <label className="font-semibold">Autenticación</label>
                        <div className="flex gap-2 mt-1">
                            <select
                                className="select select-bordered"
                                value={authType}
                                onChange={(e) => setAuthType(e.target.value)}>
                                <option value="">Ninguna</option>
                                <option value="bearer">Bearer Token</option>
                                <option value="basic">Basic Auth</option>
                            </select>
                            {authType === 'bearer' && (
                                <input
                                    className="input input-bordered flex-1"
                                    placeholder="Token"
                                    value={authToken}
                                    onChange={(e) => setAuthToken(e.target.value)}
                                />
                            )}
                            {authType === 'basic' && (
                                <div className="flex gap-2 flex-1">
                                    <input
                                        className="input input-bordered w-1/2"
                                        placeholder="Usuario"
                                        value={basicUser}
                                        onChange={(e) => setBasicUser(e.target.value)}
                                    />
                                    <input
                                        className="input input-bordered w-1/2"
                                        placeholder="Contraseña"
                                        type="password"
                                        value={basicPass}
                                        onChange={(e) => setBasicPass(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
