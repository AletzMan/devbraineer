'use client';
import { useSearchParams } from 'next/navigation';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';
import GradientComponent from './components/GradientComponent';
import { Suspense } from 'react';

export default function GradientGeneratorPage() {
    const params = useSearchParams();

    return (
        <LayoutSubSection>
            <Suspense fallback={<div>Loading...</div>}>
                <GradientComponent params={params} />
            </Suspense>
        </LayoutSubSection>
    );
}
