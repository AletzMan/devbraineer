'use client';

import { useState } from 'react';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';
import ColorToValue from './components/ColorToValue';
import ValueToColor from './components/ValueToColor';

export default function ResistorCalculatorPage() {
    const [numBands, setNumBands] = useState<4 | 5>(4);

    return (
        <LayoutSubSection>
            <div role="tablist" className="tabs tabs-box">
                <input
                    type="radio"
                    name="resistor_tabs"
                    role="tab"
                    className="tab"
                    aria-label="Colores a Valor"
                    defaultChecked
                />
                <ColorToValue numBands={numBands} setNumBands={setNumBands} />

                <input type="radio" name="resistor_tabs" role="tab" className="tab" aria-label="Valor a Colores" />
                <ValueToColor numBands={numBands} setNumBands={setNumBands} />
            </div>
        </LayoutSubSection>
    );
}
