'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RequestForm } from './components/RequestForm';
import { ResponseViewer } from './components/ResponseViewer';
import HeaderSection from '../../componentes/HeaderSection';
import { getHistoryFromLocalStorage, saveHistoryToLocalStorage } from '@/lib/storage';
import { RequestHistory } from '@prisma/client';
import { useAuth } from '@clerk/nextjs';
import SideBarHistory from './components/SideBarHistory';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';
import Splitter from '@ihatecode/react-splitter';

export default function HttpClientPage() {
    const { userId } = useAuth();
    const [history, setHistory] = useState<RequestHistory[]>([]);
    const [sending, setSending] = useState(false);
    const [response, setResponse] = useState({
        status: 0,
        statusText: '',
        headers: {},
        body: {},
        time: 0,
        size: 0,
    });
    const [formState, setFormState] = useState<{
        method: string;
        url: string;
        headers: { key: string; value: string }[];
        body: string;
    } | null>(null);

    useEffect(() => {
        const savedHistory = getHistoryFromLocalStorage();
        setHistory(savedHistory);
    }, []);

    const sendRequest = async ({ method, url, headers, body }: any) => {
        try {
            setSending(true);
            const formattedHeaders: Record<string, string> = {};
            headers.forEach((h: any) => {
                if (h.key && h.value) formattedHeaders[h.key] = h.value;
            });

            const res = await axios.post('/api/proxy', {
                method,
                url,
                headers: formattedHeaders,
                body: body ? JSON.parse(body) : undefined,
            });

            const responseData = res.data.data;
            setResponse({
                status: responseData.status,
                statusText: responseData.statusText,
                headers: responseData.headers,
                body: responseData.data,
                time: responseData.time,
                size: responseData.size,
            });

            saveHistoryToLocalStorage({
                method,
                url,
                headers,
                body: JSON.stringify(body),
                response: JSON.stringify(responseData),
                created_at: new Date(),
                id: crypto.randomUUID(),
                userId: userId || '',
                collectionId: null,
            });

            setHistory((prev) => [
                ...prev,
                {
                    method,
                    url,
                    headers,
                    body: JSON.stringify(body),
                    response: JSON.stringify(responseData),
                    created_at: new Date(),
                    id: crypto.randomUUID(),
                    userId: userId || '',
                    collectionId: null,
                },
            ]);
        } catch (err: any) {
            setResponse({
                status: 0,
                statusText: 'Error de red o JSON inválido',
                headers: {},
                body: { message: err.message },
                time: 0,
                size: 0,
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <LayoutSubSection>
            <div className="grid grid-cols-[375px_1fr] gap-2 max-md:flex max-md:flex-col h-[calc(100svh-6.4rem)]">
                <SideBarHistory history={history} setHistory={setHistory} setFormState={setFormState} />

                <Splitter
                    className="overflow-hidden h-full"
                    direction="vertical"
                    splitbar={{ color: '#595959', size: 3 }}
                    items={[
                        {
                            min: 200,
                            content: (
                                <section className="bg-base-100 shadow-md rounded-sm p-2 space-y-4 h-full overflow-y-auto scrollbar-thin border border-base-300">
                                    <RequestForm
                                        onSend={sendRequest}
                                        initialValues={formState || undefined}
                                        sending={sending}
                                    />
                                </section>
                            ),
                        },
                        {
                            min: 275,
                            content: (
                                <section className="shadow-md rounded-sm p-2 h-full overflow-y-auto scrollbar-thin bg-base-100 border border-base-300">
                                    <ResponseViewer response={response} />
                                </section>
                            ),
                        },
                    ]}
                />
            </div>
        </LayoutSubSection>
    );
}
