'use client';
import GradientGenerator from './components/GradientGenerator';
import TailwindGradientGenerator from './components/TailwindGradientGenerator';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function GradientGeneratorPage() {
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
        <LayoutSubSection>
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
        </LayoutSubSection>
    );
}
