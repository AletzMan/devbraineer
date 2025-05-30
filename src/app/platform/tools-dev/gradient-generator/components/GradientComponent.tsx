import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useState, useLayoutEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import GradientGenerator from './GradientGenerator';
import TailwindGradientGenerator from './TailwindGradientGenerator';

export default function GradientComponent() {
    const [tabGradient, setTabGradient] = useState<'css' | 'tailwind'>('css');
    const params = useSearchParams();

    useLayoutEffect(() => {
        const type = params.get('type');
        if (type === 'tailwind') {
            setTabGradient('tailwind');
        } else {
            setTabGradient('css');
        }
    }, [params]);

    const handleChangeTab = (tab: 'css' | 'tailwind') => {
        const url = new URL(window.location.href);
        url.searchParams.set('type', tab);
        window.history.replaceState(null, '', url);
    };
    return (
        <>
            <Toaster position="top-center" />
            <div className="tabs tabs-box">
                <input
                    type="radio"
                    name="tabGradient"
                    className="tab"
                    aria-label="Gradient CSS"
                    checked={tabGradient === 'css'}
                    onChange={() => handleChangeTab('css')}
                />
                <input
                    type="radio"
                    name="tabGradient"
                    className="tab"
                    aria-label="Gradient Tailwind"
                    checked={tabGradient === 'tailwind'}
                    onChange={() => handleChangeTab('tailwind')}
                />
            </div>

            <div className="flex flex-col gap-2">
                {tabGradient === 'css' && <GradientGenerator />}
                {tabGradient === 'tailwind' && <TailwindGradientGenerator />}
            </div>
        </>
    );
}
