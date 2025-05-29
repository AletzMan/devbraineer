'use client';

import { useState, useEffect } from 'react';
import { Wifi, Calculator, RotateCcw } from 'lucide-react';
import HeaderSection from '../../componentes/HeaderSection';
import SectionCalculator from '../circuit-calculator/components/SectionCalculator';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';

export default function ResistorCalculatorPage() {
    // Estado para el calculador de código de colores
    const [band1, setBand1] = useState('brown');
    const [band2, setBand2] = useState('black');
    const [band3, setBand3] = useState('red');
    const [multiplier, setMultiplier] = useState('brown');
    const [tolerance, setTolerance] = useState('gold');
    const [resistanceValue, setResistanceValue] = useState('');
    const [toleranceValue, setToleranceValue] = useState('');

    // Estado para el calculador de valor a colores
    const [resistance, setResistance] = useState('');
    const [selectedTolerance, setSelectedTolerance] = useState('5');
    const [colorBands, setColorBands] = useState<string[]>([]);

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

    // Mapeo inverso de valores a colores para el cálculo de valor a colores
    const valueToColor: Record<number, string> = {
        0: 'black',
        1: 'brown',
        2: 'red',
        3: 'orange',
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

    // Función para calcular el valor de la resistencia a partir de los colores
    const calculateResistance = () => {
        try {
            const value1 = colorValues[band1];
            const value2 = colorValues[band2];
            const value3 = colorValues[band3];
            const mult = multiplierValues[multiplier];
            const tol = toleranceValues[tolerance];

            // Calcular el valor de la resistencia
            const resistanceVal = (value1 * 100 + value2 * 10 + value3) * mult;

            // Formatear el valor para mostrar
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

    // Función para calcular los colores a partir del valor de la resistencia
    const calculateColors = () => {
        try {
            const resistanceVal = Number.parseFloat(resistance);
            if (isNaN(resistanceVal) || resistanceVal < 0) {
                setColorBands([]);
                return;
            }

            // Convertir el valor a una cadena sin decimales
            let valueStr = resistanceVal.toString().replace('.', '');

            // Ajustar el multiplicador
            let multiplierPower = 0;
            if (resistanceVal >= 100) {
                while (valueStr.length > 3) {
                    valueStr = valueStr.substring(0, valueStr.length - 1);
                    multiplierPower++;
                }
            } else if (resistanceVal < 10) {
                // Para valores menores a 10, ajustar el multiplicador
                valueStr = (resistanceVal * 10).toFixed(0);
                multiplierPower = -1;
            }

            // Obtener los dígitos para las bandas
            const digits = valueStr
                .padStart(3, '0')
                .split('')
                .map((d) => Number.parseInt(d));

            // Mapear los dígitos a colores
            const colors = digits.map((d) => valueToColor[d]);

            // Determinar el color del multiplicador
            let multiplierColor = 'black';
            if (multiplierPower >= 0) {
                multiplierColor = valueToColor[multiplierPower];
            } else if (multiplierPower === -1) {
                multiplierColor = 'gold';
            } else if (multiplierPower === -2) {
                multiplierColor = 'silver';
            }

            // Añadir el color de tolerancia
            const toleranceColor = toleranceToColor[selectedTolerance];

            setColorBands([...colors, multiplierColor, toleranceColor]);
        } catch (error) {
            setColorBands([]);
        }
    };

    // Calcular automáticamente cuando cambien los colores
    useEffect(() => {
        calculateResistance();
    }, [band1, band2, band3, multiplier, tolerance]);

    // Calcular automáticamente cuando cambie el valor de resistencia
    useEffect(() => {
        calculateColors();
    }, [resistance, selectedTolerance]);

    return (
        <LayoutSubSection>
            <div role="tablist" className="tabs tabs-box">
                <input
                    type="radio"
                    name="resistor_tabs"
                    role="tab"
                    className="tab "
                    aria-label="Colores a Valor"
                    defaultChecked
                />
                <div role="tabpanel" className="tab-content rounded-sm p-6 bg-base-100 mt-1">
                    <div className="card rounded-sm shadow-xl bg-base-200">
                        <div className="card-body">
                            <h2 className="card-title rounded-sm text-2xl flex items-center gap-2">
                                <Calculator className="h-6 w-6 text-accent" />
                                Código de Colores
                            </h2>
                            <p className="text-base-content text-opacity-70">
                                Selecciona los colores de las bandas para calcular el valor de la resistencia
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="space-y-4">
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

                                <div className="flex flex-col items-center justify-center bg-base-100 rounded-lg p-4 border-1 border-gray-700 border-dashed">
                                    <h3 className="text-xl font-semibold mb-4">Visualización de Resistencia</h3>
                                    <div className="relative w-64 h-24 mb-6">
                                        <div className="absolute top-10 left-0 right-0 h-4 bg-[#707070] rounded-sm"></div>
                                        <div className="absolute top-[calc(50%-24px)] left-[calc(50%-90px)] w-45 h-12 rounded-sm bg-[#a58053]"></div>

                                        {/* Resistor body and bands */}
                                        <div
                                            className="absolute top-6 left-16 w-4 h-12 rounded-sm"
                                            style={{
                                                backgroundColor: band1 === 'white' ? '#f8f9fa' : band1,
                                            }}></div>
                                        <div
                                            className="absolute top-6 left-24 w-4 h-12 rounded-sm"
                                            style={{
                                                backgroundColor: band2 === 'white' ? '#f8f9fa' : band2,
                                            }}></div>
                                        <div
                                            className="absolute top-6 left-32 w-4 h-12 rounded-sm"
                                            style={{
                                                backgroundColor: band3 === 'white' ? '#f8f9fa' : band3,
                                            }}></div>
                                        <div
                                            className="absolute top-6 left-40 w-4 h-12 rounded-sm"
                                            style={{
                                                backgroundColor: multiplier === 'white' ? '#f8f9fa' : multiplier,
                                            }}></div>
                                        <div
                                            className={
                                                tolerance === 'none'
                                                    ? 'absolute top-6 left-48 w-4 h-12 rounded-sm border border-gray-400'
                                                    : 'absolute top-6 left-48 w-4 h-12 rounded-sm'
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

                                    <div className="alert alert-info shadow-lg w-full max-w-sm mt-auto">
                                        <div>
                                            <h4 className="font-bold">Valor: {resistanceValue}</h4>
                                            <p className="text-sm">Tolerancia: {toleranceValue}</p>
                                        </div>
                                    </div>

                                    <div className="text-sm text-base-content text-opacity-70 mt-4">
                                        <p>Fórmula: (Banda1 × 100 + Banda2 × 10 + Banda3) × Multiplicador</p>
                                        <p>
                                            Ejemplo: ({colorValues[band1]} × 100 + {colorValues[band2]} × 10 +{' '}
                                            {colorValues[band3]}) × {multiplierValues[multiplier]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <input type="radio" name="resistor_tabs" role="tab " className="tab" aria-label="Valor a Colores" />
                <div role="tabpanel" className="tab-content rounded-sm p-6 bg-base-100 mt-1">
                    <div className="card rounded-sm shadow-xl bg-base-200">
                        <div className="card-body">
                            <h2 className="card-title text-2xl flex items-center gap-2">
                                <Calculator className="h-6 w-6 text-accent" />
                                Valor a Colores
                            </h2>
                            <p className="text-base-content text-opacity-70">
                                Ingresa el valor de la resistencia para obtener los colores correspondientes
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
                                <div className="space-y-4">
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
                                            onChange={(e) => setResistance(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Tolerancia</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={selectedTolerance}
                                            onChange={(e) => setSelectedTolerance(e.target.value)}>
                                            {toleranceOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="alert alert-info rounded-md shadow-md text-sm">
                                        <div className="flex flex-col gap-2">
                                            <p className="font-semibold text-base text-info-content">
                                                📘 Instrucciones
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-info-content">
                                                <li>
                                                    Ingresa el valor de la resistencia en{' '}
                                                    <span className="font-semibold">ohmios (Ω)</span>
                                                </li>
                                                <li>
                                                    Selecciona la{' '}
                                                    <span className="font-semibold">tolerancia deseada</span>
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

                                <div className="flex flex-col items-center justify-center bg-base-100 rounded-lg p-4 bg border-1 border-gray-700 border-dashed">
                                    <h3 className="text-xl font-semibold mb-4">Colores de la Resistencia</h3>

                                    <div className="relative w-64 h-24 mb-6">
                                        <div className="absolute top-10 left-0 right-0 h-4 bg-[#707070] rounded-sm"></div>
                                        <div className="absolute top-[calc(50%-24px)] left-[calc(50%-90px)] w-45 h-12 rounded-sm bg-[#a58053]"></div>

                                        {colorBands.length >= 5 ? (
                                            <>
                                                <div
                                                    className="absolute top-6 left-16 w-4 h-12 rounded-sm"
                                                    style={{
                                                        backgroundColor:
                                                            colorBands[0] === 'white' ? '#f8f9fa' : colorBands[0],
                                                    }}></div>
                                                <div
                                                    className="absolute top-6 left-24 w-4 h-12 rounded-sm"
                                                    style={{
                                                        backgroundColor:
                                                            colorBands[1] === 'white' ? '#f8f9fa' : colorBands[1],
                                                    }}></div>
                                                <div
                                                    className="absolute top-6 left-32 w-4 h-12 rounded-sm"
                                                    style={{
                                                        backgroundColor:
                                                            colorBands[2] === 'white' ? '#fabling' : colorBands[2],
                                                    }}></div>
                                                <div
                                                    className="absolute top-6 left-40 w-4 h-12 rounded-sm"
                                                    style={{
                                                        backgroundColor:
                                                            colorBands[3] === 'white' ? '#f8f9fa' : colorBands[3],
                                                    }}></div>
                                                <div
                                                    className={
                                                        colorBands[4] === 'none'
                                                            ? 'absolute top-6 left-48 w-4 h-12 rounded-sm border border-gray-400'
                                                            : 'absolute top-6 left-48 w-4 h-12 rounded-sm'
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            colorBands[4] === 'none'
                                                                ? 'transparent'
                                                                : colorBands[4] === 'white'
                                                                  ? '#f8f9fa'
                                                                  : colorBands[4],
                                                    }}></div>
                                            </>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-base-content text-opacity-50">
                                                Ingresa un valor para ver los colores
                                            </div>
                                        )}
                                    </div>

                                    {colorBands.length >= 5 && (
                                        <div className="space-y-2">
                                            <div className="grid grid-cols-5 gap-2">
                                                <div className="text-center">
                                                    <div
                                                        className="w-6 h-6 rounded-full mx-auto"
                                                        style={{
                                                            backgroundColor:
                                                                colorBands[0] === 'white' ? '#f8f9fa' : colorBands[0],
                                                        }}></div>
                                                    <p className="text-xs mt-1 capitalize">{colorBands[0]}</p>
                                                </div>

                                                <div className="text-center">
                                                    <div
                                                        className="w-6 h-6 rounded-full mx-auto"
                                                        style={{
                                                            backgroundColor:
                                                                colorBands[1] === 'white' ? '#f8f9fa' : colorBands[1],
                                                        }}></div>
                                                    <p className="text-xs mt-1 capitalize">{colorBands[1]}</p>
                                                </div>

                                                <div className="text-center">
                                                    <div
                                                        className="w-6 h-6 rounded-full mx-auto"
                                                        style={{
                                                            backgroundColor:
                                                                colorBands[2] === 'white' ? '#f8f9fa' : colorBands[2],
                                                        }}></div>
                                                    <p className="text-xs mt-1 capitalize">{colorBands[2]}</p>
                                                </div>

                                                <div className="text-center">
                                                    <div
                                                        className="w-6 h-6 rounded-full mx-auto"
                                                        style={{
                                                            backgroundColor:
                                                                colorBands[3] === 'white' ? '#f8f9fa' : colorBands[3],
                                                        }}></div>
                                                    <p className="text-xs mt-1 capitalize">{colorBands[3]}</p>
                                                </div>

                                                <div className="text-center">
                                                    {colorBands[4] === 'none' ? (
                                                        <div className="w-6 h-6 rounded-full mx-auto border border-gray-400"></div>
                                                    ) : (
                                                        <div
                                                            className="w-6 h-6 rounded-full mx-auto"
                                                            style={{
                                                                backgroundColor:
                                                                    colorBands[4] === 'white'
                                                                        ? '#f8f9fa'
                                                                        : colorBands[4],
                                                            }}></div>
                                                    )}
                                                    <p className="text-xs mt-1 capitalize">{colorBands[4]}</p>
                                                </div>
                                            </div>

                                            <div className="text-center text-sm text-base-content text-opacity-70 mt-4">
                                                <p>
                                                    Valor: {resistance} Ω ±{selectedTolerance}%
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        className="btn btn-outline mt-6 gap-1"
                                        onClick={() => {
                                            setResistance('');
                                            setColorBands([]);
                                        }}>
                                        <RotateCcw className="h-4 w-4" />
                                        Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutSubSection>
    );
}
