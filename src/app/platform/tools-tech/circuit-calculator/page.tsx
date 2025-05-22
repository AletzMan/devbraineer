'use client';

import { useState } from 'react';
import 'katex/dist/katex.min.css';
import HeaderSection from '../../componentes/HeaderSection';
import OhmCalcutor from './components/OhmCalcutor';
import TotalResistor from './components/TotalResistor';
import VoltageDivider from './components/VoltageDivider';
import Reactance from './components/Reactance';
import RCTimeConstant from './components/RCTimeConstant';

export default function CircuitCalculatorPage() {
    const [activeCalculator, setActiveCalculator] = useState('ohm');

    return (
        <div className="flex min-h-screen bg-neutral/50">
            <div className="flex flex-col gap-2 w-full flex-1 max-w-(--max-width) mx-auto">
                <HeaderSection
                    title="Calculadora de Circuitos"
                    description="Herramientas esenciales para cálculos eléctricos y electrónicos.">
                    <label className="label flex flex-col justify-start items-start">
                        Selecciona una calculadora:
                        <select
                            id="calculator-select"
                            className="select select-bordered w-full "
                            value={activeCalculator}
                            onChange={(e) => setActiveCalculator(e.target.value)}>
                            <option value="ohm">Ley de Ohm</option>
                            <option value="seriesParallel">Resistencia Total (Serie/Paralelo)</option>
                            <option value="voltageDivider">Divisor de Voltaje</option>
                            <option value="reactance">Reactancia</option>
                            <option value="rcTimeConstant">Constante de Tiempo RC</option>
                        </select>
                    </label>
                </HeaderSection>

                {/* Ley de Ohm Calculator */}
                {activeCalculator === 'ohm' && <OhmCalcutor />}

                {/* Resistencia Total (Serie/Paralelo) Calculator */}
                {activeCalculator === 'seriesParallel' && <TotalResistor />}

                {/* Divisor de Voltaje Calculator */}
                {activeCalculator === 'voltageDivider' && <VoltageDivider />}

                {/* Reactancia Calculator */}
                {activeCalculator === 'reactance' && <Reactance />}

                {/* RC Time Constant Calculator */}
                {activeCalculator === 'rcTimeConstant' && <RCTimeConstant />}
            </div>
        </div>
    );
}
