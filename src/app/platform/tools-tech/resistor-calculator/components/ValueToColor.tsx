'use client';

import { useEffect, useState } from 'react';
import { Calculator } from 'lucide-react';
import { LayoutSubSection } from '../../../componentes/LayoutSubSection';
import HeaderSection from '@/app/platform/componentes/HeaderSection';

interface ValueToColorProps {
    numBands: 4 | 5;
    setNumBands: (num: 4 | 5) => void;
}

export default function ValueToColor({ numBands, setNumBands }: ValueToColorProps) {
    const [resistance, setResistance] = useState('');
    const [selectedTolerance, setSelectedTolerance] = useState('5');
    const [colorBands, setColorBands] = useState<string[]>([]);

    const toleranceOptions = [
        { value: '1', label: '1%' },
        { value: '2', label: '2%' },
        { value: '0.5', label: '0.5%' },
        { value: '0.25', label: '0.25%' },
        { value: '0.1', label: '0.1%' },
        { value: '0.05', label: '0.05%' },
        { value: '5', label: '5%' },
        { value: '10', label: '10%' },
        { value: '20', label: '20%' },
    ];

    const valueToColor: Record<number, string> = {
        0: 'black',
        1: 'brown',
        2: 'red',
        3: 'darkorange',
        4: 'yellow',
        5: 'green',
        6: 'blue',
        7: 'violet',
        8: 'grey',
        9: 'white',
    };

    const toleranceToColor: Record<string, string> = {
        '1': 'brown',
        '2': 'red',
        '0.5': 'green',
        '0.25': 'blue',
        '0.1': 'violet',
        '0.05': 'grey',
        '5': 'gold',
        '10': 'silver',
        '20': 'none',
    };

    useEffect(() => {
        calculateColors();
    }, [resistance, selectedTolerance, numBands]);

    const calculateColors = () => {
        try {
            let resistanceVal = Number.parseFloat(resistance);
            if (isNaN(resistanceVal) || resistanceVal < 0) {
                setColorBands([]);
                return;
            }

            let tempResistance = resistanceVal;
            let multiplierPower = 0;

            if (tempResistance >= 10) {
                while (tempResistance >= 1000 && multiplierPower < 9) {
                    tempResistance /= 1000;
                    multiplierPower += 3;
                }
                while (tempResistance < 100 && tempResistance >= 1 && multiplierPower > -2) {
                    tempResistance *= 10;
                    multiplierPower--;
                }
                while (tempResistance >= 1000) {
                    tempResistance /= 10;
                    multiplierPower++;
                }
            } else if (tempResistance < 1) {
                while (tempResistance < 1 && multiplierPower > -2) {
                    tempResistance *= 10;
                    multiplierPower--;
                }
            }

            let roundedValue = Math.round(tempResistance);
            let valueStr = roundedValue.toString();

            let cBands = [];
            if (numBands === 5) {
                const band1Digit = parseInt(valueStr[0] || '0');
                const band2Digit = parseInt(valueStr[1] || '0');
                const band3Digit = parseInt(valueStr[2] || '0');

                const color1 = valueToColor[band1Digit];
                const color2 = valueToColor[band2Digit];
                const color3 = valueToColor[band3Digit];

                cBands = [color1, color2, color3];
            } else {
                const band1Digit = parseInt(valueStr[0] || '0');
                const band2Digit = parseInt(valueStr[1] || '0');

                const color1 = valueToColor[band1Digit];
                const color2 = valueToColor[band2Digit];

                cBands = [color1, color2];
                if (valueStr.length > 2 && multiplierPower >= 0) {
                    multiplierPower += valueStr.length - 2;
                }
                if (resistanceVal < 10 && multiplierPower < 0) {
                    const significantDigitsStr = (resistanceVal * (multiplierPower === -1 ? 10 : 100)).toFixed(0);
                    cBands[0] = valueToColor[parseInt(significantDigitsStr[0] || '0')];
                    cBands[1] = valueToColor[parseInt(significantDigitsStr[1] || '0')];
                }
            }

            let multiplierColor = 'black';
            if (multiplierPower === -1) {
                multiplierColor = 'gold';
            } else if (multiplierPower === -2) {
                multiplierColor = 'silver';
            } else if (multiplierPower >= 0 && multiplierPower <= 9) {
                multiplierColor = valueToColor[multiplierPower];
            } else {
                multiplierColor = 'none';
            }

            const toleranceColor = toleranceToColor[selectedTolerance];

            if (numBands === 5) {
                setColorBands([...cBands, multiplierColor, toleranceColor]);
            } else {
                setColorBands([...cBands, multiplierColor, toleranceColor]);
            }
        } catch (error) {
            console.error('Error calculating colors:', error);
            setColorBands([]);
        }
    };

    return (
        <div role="tabpanel" className="tab-content rounded-sm p-6 bg-base-100 mt-1">
            <div className="rounded-sm shadow-xl bg-base-100 border-base-300 border">
                <div className="w-full">
                    <HeaderSection
                        title="Valor a Colores"
                        description="Ingresa el valor de la resistencia para obtener los colores correspondientes"
                    />
                    <div className="flex flex-col p-2 bg-base-100 w-full">
                        <div className="form-control w-full max-w-xs mt-4">
                            <label className="label">
                                <span className="label-text">Número de Bandas</span>
                            </label>
                            <select
                                className="select rounded-sm select-bordered w-full"
                                value={numBands}
                                onChange={(e) => setNumBands(parseInt(e.target.value) as 4 | 5)}>
                                <option value={4}>4 Bandas</option>
                                <option value={5}>5 Bandas</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 bg-base-100 p-2 rounded-sm border-base-300 border">
                            <div className="space-y-4 bg-base-200 p-2 rounded-sm">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Valor de la Resistencia (Ω)</span>
                                    </label>
                                    <input
                                        id="resistance-value"
                                        type="number"
                                        placeholder="Ingresa el valor en ohmios"
                                        className="input input-bordered w-full"
                                        value={resistance}
                                        onChange={(e) => {
                                            setResistance(e.target.value);
                                        }}
                                    />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Tolerancia</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={selectedTolerance}
                                        onChange={(e) => {
                                            setSelectedTolerance(e.target.value);
                                        }}>
                                        {toleranceOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="alert alert-info rounded-md shadow-md text-sm">
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold text-base text-info-content">📘 Instrucciones</p>
                                        <ul className="list-disc list-inside space-y-1 text-info-content">
                                            <li>
                                                Ingresa el valor de la resistencia en{' '}
                                                <span className="font-semibold">ohmios (Ω)</span>
                                            </li>
                                            <li>
                                                Selecciona la <span className="font-semibold">tolerancia deseada</span>
                                            </li>
                                            <li>
                                                Los colores se mostrarán{' '}
                                                <span className="font-semibold">automáticamente</span>
                                            </li>
                                            <li>Para valores decimales, usa (.) como separador</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center bg-lines rounded-lg p-4 border-1 border-base-content/15 border-dashed">
                                <h3 className="text-xl font-semibold mb-4">Colores de la Resistencia</h3>

                                <div className="relative w-64 h-24 mb-6">
                                    <div className="absolute top-10 left-0 right-0 h-4 bg-[#707070] rounded-sm"></div>

                                    {colorBands.length > 0 ? (
                                        <div className="absolute top-[calc(50%-24px)] left-[calc(50%-90px)] flex items-center justify-center gap-3 w-45 h-12 rounded-sm bg-[#a58053]">
                                            <div
                                                className="w-4 h-12 rounded-xs"
                                                style={{
                                                    backgroundColor:
                                                        colorBands[0] === 'white' ? '#f8f9fa' : colorBands[0],
                                                }}></div>
                                            <div
                                                className="w-4 h-12 rounded-xs"
                                                style={{
                                                    backgroundColor:
                                                        colorBands[1] === 'white' ? '#f8f9fa' : colorBands[1],
                                                }}></div>
                                            {numBands === 5 && (
                                                <div
                                                    className="w-4 h-12 rounded-xs"
                                                    style={{
                                                        backgroundColor:
                                                            colorBands[2] === 'white' ? '#f8f9fa' : colorBands[2],
                                                    }}></div>
                                            )}
                                            <div
                                                className="w-4 h-12 rounded-xs"
                                                style={{
                                                    backgroundColor:
                                                        colorBands[numBands === 5 ? 3 : 2] === 'white'
                                                            ? '#f8f9fa'
                                                            : colorBands[numBands === 5 ? 3 : 2],
                                                }}></div>
                                            <div
                                                className={
                                                    colorBands[numBands === 5 ? 4 : 3] === 'none'
                                                        ? 'w-4 h-12 rounded-xs border border-gray-400'
                                                        : 'w-4 h-12 rounded-xs'
                                                }
                                                style={{
                                                    backgroundColor:
                                                        colorBands[numBands === 5 ? 4 : 3] === 'none'
                                                            ? 'transparent'
                                                            : colorBands[numBands === 5 ? 4 : 3] === 'white'
                                                              ? '#f8f9fa'
                                                              : colorBands[numBands === 5 ? 4 : 3],
                                                }}></div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-base-content text-opacity-50">
                                            Ingresa un valor para ver los colores
                                        </div>
                                    )}
                                </div>

                                {colorBands.length > 0 && (
                                    <div className="space-y-2">
                                        <div className={`grid gap-2 ${numBands === 5 ? 'grid-cols-5' : 'grid-cols-4'}`}>
                                            <div className="text-center">
                                                <div
                                                    className="w-6 h-6 rounded-full mx-auto"
                                                    style={{
                                                        backgroundColor:
                                                            colorBands[0] === 'white' ? '#f8f9fa' : colorBands[0],
                                                    }}></div>
                                                <p className="text-xs">Banda 1</p>
                                            </div>
                                            <div className="text-center">
                                                <div
                                                    className="w-6 h-6 rounded-full mx-auto"
                                                    style={{
                                                        backgroundColor:
                                                            colorBands[1] === 'white' ? '#f8f9fa' : colorBands[1],
                                                    }}></div>
                                                <p className="text-xs">Banda 2</p>
                                            </div>
                                            {numBands === 5 && (
                                                <div className="text-center">
                                                    <div
                                                        className="w-6 h-6 rounded-full mx-auto"
                                                        style={{
                                                            backgroundColor:
                                                                colorBands[2] === 'white' ? '#f8f9fa' : colorBands[2],
                                                        }}></div>
                                                    <p className="text-xs">Banda 3</p>
                                                </div>
                                            )}
                                            <div className="text-center">
                                                <div
                                                    className="w-6 h-6 rounded-full mx-auto"
                                                    style={{
                                                        backgroundColor:
                                                            colorBands[numBands === 5 ? 3 : 2] === 'white'
                                                                ? '#f8f9fa'
                                                                : colorBands[numBands === 5 ? 3 : 2],
                                                    }}></div>
                                                <p className="text-xs">Multiplicador</p>
                                            </div>
                                            <div className="text-center">
                                                <div
                                                    className={
                                                        colorBands[numBands === 5 ? 4 : 3] === 'none'
                                                            ? 'w-6 h-6 rounded-full mx-auto border border-gray-400'
                                                            : 'w-6 h-6 rounded-full mx-auto'
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            colorBands[numBands === 5 ? 4 : 3] === 'none'
                                                                ? 'transparent'
                                                                : colorBands[numBands === 5 ? 4 : 3] === 'white'
                                                                  ? '#f8f9fa'
                                                                  : colorBands[numBands === 5 ? 4 : 3],
                                                    }}></div>
                                                <p className="text-xs">Tolerancia</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
