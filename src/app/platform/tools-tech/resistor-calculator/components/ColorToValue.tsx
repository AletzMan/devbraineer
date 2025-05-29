'use client';

import { useEffect, useState } from 'react';
import { Calculator } from 'lucide-react';
import HeaderSection from '@/app/platform/componentes/HeaderSection';

// Mapeo de colores a valores
const colorValues: Record<string, number> = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9,
};

const multiplierValues: Record<string, number> = {
    black: 1,
    brown: 10,
    red: 100,
    orange: 1000,
    yellow: 10000,
    green: 100000,
    blue: 1000000,
    violet: 10000000,
    grey: 100000000,
    white: 1000000000,
    gold: 0.1,
    silver: 0.01,
};

const toleranceValues: Record<string, string> = {
    brown: '1%',
    red: '2%',
    green: '0.5%',
    blue: '0.25%',
    violet: '0.1%',
    grey: '0.05%',
    gold: '5%',
    silver: '10%',
    none: '20%',
};

interface ColorToValueProps {
    numBands: 4 | 5;
    setNumBands: (num: 4 | 5) => void;
}

export default function ColorToValue({ numBands, setNumBands }: ColorToValueProps) {
    const [band1, setBand1] = useState('brown');
    const [band2, setBand2] = useState('black');
    const [band3, setBand3] = useState('red');
    const [multiplier, setMultiplier] = useState('brown');
    const [tolerance, setTolerance] = useState('gold');
    const [resistanceValue, setResistanceValue] = useState('');
    const [toleranceValue, setToleranceValue] = useState('');

    useEffect(() => {
        calculateResistance();
    }, [band1, band2, band3, multiplier, tolerance]);

    const calculateResistance = () => {
        try {
            const value1 = colorValues[band1];
            const value2 = colorValues[band2];
            const mult = multiplierValues[multiplier];
            const tol = toleranceValues[tolerance];

            let resistanceVal;
            if (numBands === 5) {
                const value3 = colorValues[band3];
                resistanceVal = (value1 * 100 + value2 * 10 + value3) * mult;
            } else {
                resistanceVal = (value1 * 10 + value2) * mult;
            }

            let formattedValue = '';
            if (resistanceVal >= 1000000) {
                formattedValue = `${(resistanceVal / 1000000).toFixed(2)} MΩ`;
            } else if (resistanceVal >= 1000) {
                formattedValue = `${(resistanceVal / 1000).toFixed(2)} kΩ`;
            } else {
                formattedValue = `${resistanceVal.toFixed(2)} Ω`;
            }

            setResistanceValue(formattedValue);
            setToleranceValue(tol);
        } catch (error) {
            setResistanceValue('Error en el cálculo');
            setToleranceValue('');
        }
    };

    return (
        <div role="tabpanel" className="tab-content rounded-sm p-6 bg-base-100 mt-1">
            <div className="rounded-sm shadow-xl bg-base-100 border-base-300 border">
                <div className="">
                    <HeaderSection
                        title="Colores a Valor"
                        description="Selecciona los colores de las bandas para calcular el valor de la resistencia"
                    />

                    <div className="form-control w-full max-w-xs mt-4 p-2">
                        <label className="label">
                            <span className="label-text">Número de Bandas</span>
                        </label>
                        <select
                            className="select rounded-sm select-bordered w-full"
                            value={numBands}
                            onChange={(e) => {
                                setNumBands(parseInt(e.target.value) as 4 | 5);
                                if (parseInt(e.target.value) === 4) {
                                    setBand3('black');
                                }
                            }}>
                            <option value={4}>4 Bandas</option>
                            <option value={5}>5 Bandas</option>
                        </select>
                    </div>
                    <div className="p-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 p-2 bg-base-100 rounded-sm border-base-300 border">
                            <div className="space-y-4 p-2 bg-base-200">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Primera Banda</span>
                                    </label>
                                    <select
                                        className="select rounded-sm select-bordered w-full"
                                        value={band1}
                                        onChange={(e) => setBand1(e.target.value)}>
                                        {Object.entries(colorValues).map(([color, value]) => (
                                            <option key={color} value={color}>
                                                {color.charAt(0).toUpperCase() + color.slice(1)} ({value})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Segunda Banda</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={band2}
                                        onChange={(e) => setBand2(e.target.value)}>
                                        {Object.entries(colorValues).map(([color, value]) => (
                                            <option key={color} value={color}>
                                                {color.charAt(0).toUpperCase() + color.slice(1)} ({value})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {numBands === 5 && (
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Tercera Banda</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={band3}
                                            onChange={(e) => setBand3(e.target.value)}>
                                            {Object.entries(colorValues).map(([color, value]) => (
                                                <option key={color} value={color}>
                                                    {color.charAt(0).toUpperCase() + color.slice(1)} ({value})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Multiplicador</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={multiplier}
                                        onChange={(e) => setMultiplier(e.target.value)}>
                                        {Object.entries(multiplierValues).map(([color, value]) => (
                                            <option key={color} value={color}>
                                                {color.charAt(0).toUpperCase() + color.slice(1)} (×{value})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Tolerancia</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={tolerance}
                                        onChange={(e) => setTolerance(e.target.value)}>
                                        {Object.entries(toleranceValues).map(([color, value]) => (
                                            <option key={color} value={color}>
                                                {color.charAt(0).toUpperCase() + color.slice(1)} ({value})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center bg-lines rounded-lg p-4 border-1 border-base-content/15 border-dashed">
                                <h3 className="text-xl font-semibold mb-4">Visualización de Resistencia</h3>
                                <div className="relative w-64 h-24 mb-6">
                                    <div className="absolute top-10 left-0 right-0 h-4 bg-[#707070] rounded-sm"></div>
                                    <div className="absolute top-[calc(50%-24px)] left-[calc(50%-90px)] flex gap-4 items-center justify-center w-45 h-12 rounded-sm bg-[#a58053]">
                                        <div
                                            className="w-4 h-12 rounded-xs"
                                            style={{
                                                backgroundColor: band1 === 'white' ? '#f8f9fa' : band1,
                                            }}></div>
                                        <div
                                            className="w-4 h-12 rounded-xs"
                                            style={{
                                                backgroundColor: band2 === 'white' ? '#f8f9fa' : band2,
                                            }}></div>
                                        {numBands === 5 && (
                                            <div
                                                className="w-4 h-12 rounded-xs"
                                                style={{
                                                    backgroundColor: band3 === 'white' ? '#f8f9fa' : band3,
                                                }}></div>
                                        )}
                                        <div
                                            className="w-4 h-12 rounded-xs"
                                            style={{
                                                backgroundColor: multiplier === 'white' ? '#f8f9fa' : multiplier,
                                            }}></div>
                                        <div
                                            className={
                                                tolerance === 'none'
                                                    ? 'w-4 h-12 rounded-xs border border-gray-400'
                                                    : 'w-4 h-12 rounded-xs'
                                            }
                                            style={{
                                                backgroundColor:
                                                    tolerance === 'none'
                                                        ? 'transparent'
                                                        : tolerance === 'white'
                                                          ? '#f8f9fa'
                                                          : tolerance,
                                            }}></div>
                                    </div>
                                </div>

                                <div className="alert alert-info shadow-lg w-full max-w-sm mt-auto">
                                    <div>
                                        <h4 className="font-bold">Valor: {resistanceValue}</h4>
                                        <p className="text-sm">Tolerancia: {toleranceValue}</p>
                                    </div>
                                </div>

                                <div className="text-sm text-base-content text-opacity-70 mt-4">
                                    {numBands === 5 ? (
                                        <p>Fórmula: (Banda1 × 100 + Banda2 × 10 + Banda3) × Multiplicador</p>
                                    ) : (
                                        <p>Fórmula: (Banda1 × 10 + Banda2) × Multiplicador</p>
                                    )}
                                    <p>
                                        Ejemplo: ({colorValues[band1]} ×{' '}
                                        {numBands === 5
                                            ? '100 + ' + colorValues[band2] + ' × 10 + ' + colorValues[band3]
                                            : '10 + ' + colorValues[band2]}
                                        ) × {multiplierValues[multiplier]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
