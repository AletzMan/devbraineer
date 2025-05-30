'use client';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';
import GradientComponent from './components/GradientComponent';
import { Suspense } from 'react';

export default function GradientGeneratorPage() {
    return (
        <LayoutSubSection>
            <Suspense fallback={<div>Loading...</div>}>
                <GradientComponent />
            </Suspense>
        </LayoutSubSection>
    );
}
