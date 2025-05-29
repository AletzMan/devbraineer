'use client';

import { useState } from 'react';
// Importamos los íconos necesarios para la conversión
import {
    Sliders,
    ArrowRightLeft,
    RotateCcw,
    CircleX,
    CircleCheck,
    Ruler, // Para longitud
    Weight, // Para peso/masa
    ThermometerSnowflake, // Para temperatura
    Database, // Para datos
} from 'lucide-react';
import { BlockMath } from 'react-katex'; // Para mostrar los cálculos detallados
import SectionCalculator from '../circuit-calculator/components/SectionCalculator';
import { ConversionCard } from './components/ConversionCard';
import HeaderSection from '../../componentes/HeaderSection';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';

export default function UnitConverterPage() {
    // Estado para gestionar la pestaña activa
    const [activeTab, setActiveTab] = useState('length');

    // --- Estados para cada tipo de conversión ---

    // Longitud
    const [lengthValue, setLengthValue] = useState('');
    const [fromLengthUnit, setFromLengthUnit] = useState('m');
    const [toLengthUnit, setToLengthUnit] = useState('cm');
    const [lengthResult, setLengthResult] = useState<string | null>(null);
    const [lengthCalculationDetails, setLengthCalculationDetails] = useState<string[]>([]);

    // Peso/Masa
    const [weightValue, setWeightValue] = useState('');
    const [fromWeightUnit, setFromWeightUnit] = useState('kg');
    const [toWeightUnit, setToWeightUnit] = useState('g');
    const [weightResult, setWeightResult] = useState<string | null>(null);
    const [weightCalculationDetails, setWeightCalculationDetails] = useState<string[]>([]);

    // Temperatura
    const [tempValue, setTempValue] = useState('');
    const [fromTempUnit, setFromTempUnit] = useState('c');
    const [toTempUnit, setToTempUnit] = useState('f');
    const [tempResult, setTempResult] = useState<string | null>(null);
    const [tempCalculationDetails, setTempCalculationDetails] = useState<string[]>([]);

    // Datos
    const [dataValue, setDataValue] = useState('');
    const [fromDataUnit, setFromDataUnit] = useState('mb'); // Corregido para usar el mismo patrón que los demás
    const [toDataUnit, setToDataUnit] = useState('kb');
    const [dataResult, setDataResult] = useState<string | null>(null);
    const [dataCalculationDetails, setDataCalculationDetails] = useState<string[]>([]);

    // --- Definiciones de Unidades ---
    const lengthUnits = [
        { value: 'km', label: 'Kilómetro (km)' },
        { value: 'm', label: 'Metro (m)' },
        { value: 'cm', label: 'Centímetro (cm)' },
        { value: 'mm', label: 'Milímetro (mm)' },
        { value: 'mi', label: 'Milla (mi)' },
        { value: 'yd', label: 'Yarda (yd)' },
        { value: 'ft', label: 'Pie (ft)' },
        { value: 'in', label: 'Pulgada (in)' },
    ];

    const weightUnits = [
        { value: 't', label: 'Tonelada (t)' },
        { value: 'kg', label: 'Kilogramo (kg)' },
        { value: 'g', label: 'Gramo (g)' },
        { value: 'mg', label: 'Miligramo (mg)' },
        { value: 'lb', label: 'Libra (lb)' },
        { value: 'oz', label: 'Onza (oz)' },
    ];

    const tempUnits = [
        { value: 'c', label: 'Celsius (°C)' },
        { value: 'f', label: 'Fahrenheit (°F)' },
        { value: 'k', label: 'Kelvin (K)' },
    ];

    const dataUnits = [
        { value: 'b', label: 'Byte (B)' },
        { value: 'kb', label: 'Kilobyte (KB)' },
        { value: 'mb', label: 'Megabyte (MB)' },
        { value: 'gb', label: 'Gigabyte (GB)' },
        { value: 'tb', label: 'Terabyte (TB)' },
        { value: 'pb', label: 'Petabyte (PB)' },
    ];

    // --- Factores de Conversión (a unidad base) ---
    const lengthFactors: Record<string, number> = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
    };

    const weightFactors: Record<string, number> = {
        t: 1000000,
        kg: 1000,
        g: 1,
        mg: 0.001,
        lb: 453.592,
        oz: 28.3495,
    };

    const dataFactors: Record<string, number> = {
        b: 1,
        kb: 1024,
        mb: 1024 * 1024, // 1048576
        gb: 1024 * 1024 * 1024, // 1073741824
        tb: 1024 * 1024 * 1024 * 1024, // 1099511627776
        pb: 1024 * 1024 * 1024 * 1024 * 1024, // 1125899906842624
    };

    // --- Funciones auxiliares ---
    const getUnitLabel = (value: string, units: { value: string; label: string }[]) => {
        const unit = units.find((u) => u.value === value);
        return unit ? unit.label.split(' ')[0] : value;
    };

    const getRawUnitSymbol = (value: string, units: { value: string; label: string }[]) => {
        const unit = units.find((u) => u.value === value);
        // Extrae el símbolo dentro de los paréntesis (ej. "km" de "Kilómetro (km)")
        const match = unit?.label.match(/\(([^)]+)\)/);
        return match ? match[1] : value;
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string | null>>) => {
        setter(null);
    };

    const resetFields = (
        setValue: React.Dispatch<React.SetStateAction<string>>,
        setResult: React.Dispatch<React.SetStateAction<string | null>>,
        setDetails: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        setValue('');
        setResult(null);
        setDetails([]);
    };

    // --- Funciones de Conversión ---

    const convertLength = () => {
        setLengthResult(null);
        setLengthCalculationDetails([]);
        try {
            const value = Number.parseFloat(lengthValue);
            if (isNaN(value)) {
                setLengthResult('¡Error! Ingresa un valor numérico válido.');
                return;
            }

            const fromUnitSymbol = getRawUnitSymbol(fromLengthUnit, lengthUnits);
            const toUnitSymbol = getRawUnitSymbol(toLengthUnit, lengthUnits);

            const steps: string[] = [];
            let currentStepValue = value;
            let currentStepUnit = fromUnitSymbol;

            steps.push(`${value.toFixed(6)} \\ ${fromUnitSymbol}`); // Valor inicial

            // Convertir a la unidad base (metros)
            if (fromLengthUnit !== 'm') {
                const valueInMeters = value * lengthFactors[fromLengthUnit];
                steps.push(
                    `= ${value.toFixed(6)} \\ ${fromUnitSymbol} \\times \\frac{${lengthFactors[fromLengthUnit]} \\ m}{1 \\ ${fromUnitSymbol}}`
                );
                steps.push(`= ${valueInMeters.toFixed(6)} \\ m`);
                currentStepValue = valueInMeters;
                currentStepUnit = 'm';
            }

            // Convertir de la unidad base a la unidad objetivo
            if (toLengthUnit !== 'm') {
                steps.push(
                    `= ${currentStepValue.toFixed(6)} \\ m \\times \\frac{1 \\ ${toUnitSymbol}}{${lengthFactors[toLengthUnit]} \\ m}`
                );
                const result = currentStepValue / lengthFactors[toLengthUnit];
                steps.push(`= ${result.toFixed(6)} \\ ${toUnitSymbol}`);
                setLengthResult(
                    `Resultado: ${value} ${getUnitLabel(fromLengthUnit, lengthUnits)} = ${result.toFixed(6)} ${getUnitLabel(toLengthUnit, lengthUnits)}`
                );
            } else {
                // Si la unidad objetivo es la base (metros), ya tenemos el resultado
                setLengthResult(
                    `Resultado: ${value} ${getUnitLabel(fromLengthUnit, lengthUnits)} = ${currentStepValue.toFixed(6)} ${getUnitLabel(toLengthUnit, lengthUnits)}`
                );
            }

            setLengthCalculationDetails(steps);
        } catch (error) {
            setLengthResult('¡Vaya! Hubo un error en la conversión.');
            setLengthCalculationDetails([]);
        }
    };

    const convertWeight = () => {
        setWeightResult(null);
        setWeightCalculationDetails([]);
        try {
            const value = Number.parseFloat(weightValue);
            if (isNaN(value)) {
                setWeightResult('¡Error! Ingresa un valor numérico válido.');
                return;
            }

            const fromUnitSymbol = getRawUnitSymbol(fromWeightUnit, weightUnits);
            const toUnitSymbol = getRawUnitSymbol(toWeightUnit, weightUnits);

            const steps: string[] = [];
            let currentStepValue = value;
            let currentStepUnit = fromUnitSymbol;

            steps.push(`${value.toFixed(6)} \\ ${fromUnitSymbol}`);

            // Convertir a la unidad base (gramos)
            if (fromWeightUnit !== 'g') {
                const valueInGrams = value * weightFactors[fromWeightUnit];
                steps.push(
                    `= ${value.toFixed(6)} \\ ${fromUnitSymbol} \\times \\frac{${weightFactors[fromWeightUnit]} \\ g}{1 \\ ${fromUnitSymbol}}`
                );
                steps.push(`= ${valueInGrams.toFixed(6)} \\ g`);
                currentStepValue = valueInGrams;
                currentStepUnit = 'g';
            }

            // Convertir de la unidad base a la unidad objetivo
            if (toWeightUnit !== 'g') {
                steps.push(
                    `= ${currentStepValue.toFixed(6)} \\ g \\times \\frac{1 \\ ${toUnitSymbol}}{${weightFactors[toWeightUnit]} \\ g}`
                );
                const result = currentStepValue / weightFactors[toWeightUnit];
                steps.push(`= ${result.toFixed(6)} \\ ${toUnitSymbol}`);
                setWeightResult(
                    `Resultado: ${value} ${getUnitLabel(fromWeightUnit, weightUnits)} = ${result.toFixed(6)} ${getUnitLabel(toWeightUnit, weightUnits)}`
                );
            } else {
                setWeightResult(
                    `Resultado: ${value} ${getUnitLabel(fromWeightUnit, weightUnits)} = ${currentStepValue.toFixed(6)} ${getUnitLabel(toWeightUnit, weightUnits)}`
                );
            }

            setWeightCalculationDetails(steps);
        } catch (error) {
            setWeightResult('¡Vaya! Hubo un error en la conversión.');
            setWeightCalculationDetails([]);
        }
    };

    const convertTemperature = () => {
        setTempResult(null);
        setTempCalculationDetails([]);
        try {
            const value = Number.parseFloat(tempValue);
            if (isNaN(value)) {
                setTempResult('¡Error! Ingresa un valor numérico válido.');
                return;
            }

            const fromUnitSymbol = getRawUnitSymbol(fromTempUnit, tempUnits);
            const toUnitSymbol = getRawUnitSymbol(toTempUnit, tempUnits);
            const steps: string[] = [];

            // Paso inicial
            steps.push(`${value.toFixed(2)} \\ ${fromUnitSymbol}`);

            let celsius = 0;
            // Convertir a Celsius (si no es ya Celsius)
            if (fromTempUnit === 'c') {
                celsius = value;
            } else if (fromTempUnit === 'f') {
                steps.push(`= \\frac{(${value.toFixed(2)} \\ {}^{\\circ}F - 32) \\times 5}{9}`);
                celsius = ((value - 32) * 5) / 9;
                steps.push(`= ${celsius.toFixed(2)} \\ {}^{\\circ}C`);
            } else if (fromTempUnit === 'k') {
                steps.push(`= ${value.toFixed(2)} \\ K - 273.15`);
                celsius = value - 273.15;
                steps.push(`= ${celsius.toFixed(2)} \\ {}^{\\circ}C`);
            }

            let result = 0;
            // Convertir de Celsius a la unidad objetivo
            if (toTempUnit === 'c') {
                result = celsius;
            } else if (toTempUnit === 'f') {
                steps.push(`= \\frac{(${celsius.toFixed(2)} \\ {}^{\\circ}C \\times 9)}{5} + 32`);
                result = (celsius * 9) / 5 + 32;
                steps.push(`= ${result.toFixed(2)} \\ {}^{\\circ}F`);
            } else if (toTempUnit === 'k') {
                steps.push(`= ${celsius.toFixed(2)} \\ {}^{\\circ}C + 273.15`);
                result = celsius + 273.15;
                steps.push(`= ${result.toFixed(2)} \\ K`);
            }

            setTempResult(
                `Resultado: ${value} ${getUnitLabel(fromTempUnit, tempUnits)} = ${result.toFixed(2)} ${getUnitLabel(toTempUnit, tempUnits)}`
            );
            setTempCalculationDetails(steps);
        } catch (error) {
            setTempResult('¡Vaya! Hubo un error en la conversión.');
            setTempCalculationDetails([]);
        }
    };

    const convertData = () => {
        setDataResult(null);
        setDataCalculationDetails([]);
        try {
            const value = Number.parseFloat(dataValue);
            if (isNaN(value)) {
                setDataResult('¡Error! Ingresa un valor numérico válido.');
                return;
            }

            const fromUnitSymbol = getRawUnitSymbol(fromDataUnit, dataUnits);
            const toUnitSymbol = getRawUnitSymbol(toDataUnit, dataUnits);

            const steps: string[] = [];
            let currentStepValue = value;
            let currentStepUnit = fromUnitSymbol;

            steps.push(`${value.toFixed(6)} \\ ${fromUnitSymbol}`);

            // Convertir a la unidad base (bytes)
            if (fromDataUnit !== 'b') {
                const valueInBytes = value * dataFactors[fromDataUnit];
                // Evitamos notación científica en el cálculo intermedio para claridad
                steps.push(
                    `= ${value.toFixed(6)} \\ ${fromUnitSymbol} \\times \\frac{${dataFactors[fromDataUnit]} \\ B}{1 \\ ${fromUnitSymbol}}`
                );
                steps.push(`= ${valueInBytes.toFixed(6)} \\ B`);
                currentStepValue = valueInBytes;
                currentStepUnit = 'B';
            }

            // Convertir de la unidad base a la unidad objetivo
            if (toDataUnit !== 'b') {
                steps.push(
                    `= ${currentStepValue.toFixed(6)} \\ B \\times \\frac{1 \\ ${toUnitSymbol}}{${dataFactors[toDataUnit]} \\ B}`
                );
                const result = currentStepValue / dataFactors[toDataUnit];
                steps.push(`= ${result.toFixed(6)} \\ ${toUnitSymbol}`);
                setDataResult(
                    `Resultado: ${value} ${getUnitLabel(fromDataUnit, dataUnits)} = ${result.toFixed(6)} ${getUnitLabel(toDataUnit, dataUnits)}`
                );
            } else {
                setDataResult(
                    `Resultado: ${value} ${getUnitLabel(fromDataUnit, dataUnits)} = ${currentStepValue.toFixed(6)} ${getUnitLabel(toDataUnit, dataUnits)}`
                );
            }

            setDataCalculationDetails(steps);
        } catch (error) {
            setDataResult('¡Vaya! Hubo un error en la conversión.');
            setDataCalculationDetails([]);
        }
    };

    // --- Funciones para intercambiar unidades ---
    const swapLengthUnits = () => {
        const temp = fromLengthUnit;
        setFromLengthUnit(toLengthUnit);
        setToLengthUnit(temp);
        handleInputChange(setLengthResult);
        setLengthCalculationDetails([]);
    };

    const swapWeightUnits = () => {
        const temp = fromWeightUnit;
        setFromWeightUnit(toWeightUnit);
        setToWeightUnit(temp);
        handleInputChange(setWeightResult);
        setWeightCalculationDetails([]);
    };

    const swapTempUnits = () => {
        const temp = fromTempUnit;
        setFromTempUnit(toTempUnit);
        setToTempUnit(temp);
        handleInputChange(setTempResult);
        setTempCalculationDetails([]);
    };

    const swapDataUnits = () => {
        const temp = fromDataUnit;
        setFromDataUnit(toDataUnit);
        setToDataUnit(temp);
        handleInputChange(setDataResult);
        setDataCalculationDetails([]);
    };

    return (
        <LayoutSubSection>
            <div role="tablist" className="tabs tabs-box mb-2 gap-1">
                <button
                    role="tab"
                    className={`tab flex items-center gap-2 rounded-sm  px-4 py-2 text-sm ${activeTab === 'length' ? 'tab-active bg-primary text-primary-content' : ''}`}
                    onClick={() => setActiveTab('length')}>
                    <Ruler className="h-4 w-4" />
                    Longitud
                </button>
                <button
                    role="tab"
                    className={`tab flex items-center gap-2 rounded-sm duration-300 px-4 py-2 text-sm ${activeTab === 'weight' ? 'tab-active bg-primary text-primary-content' : ''}`}
                    onClick={() => setActiveTab('weight')}>
                    <Weight className="h-4 w-4" />
                    Peso/Masa
                </button>
                <button
                    role="tab"
                    className={`tab flex items-center gap-2 rounded-sm duration-300 px-4 py-2 text-sm ${activeTab === 'temperature' ? 'tab-active bg-primary text-primary-content' : ''}`}
                    onClick={() => setActiveTab('temperature')}>
                    <ThermometerSnowflake className="h-4 w-4" />
                    Temperatura
                </button>
                <button
                    role="tab"
                    className={`tab flex items-center gap-2 rounded-sm duration-300 px-4 py-2 text-sm ${activeTab === 'data' ? 'tab-active bg-primary text-primary-content' : ''}`}
                    onClick={() => setActiveTab('data')}>
                    <Database className="h-4 w-4" />
                    Datos
                </button>
            </div>
            {/* --- Contenido de Conversor de Longitud --- */}
            {activeTab === 'length' && (
                <ConversionCard
                    title="Longitud"
                    description="Convierte entre diferentes unidades de longitud."
                    icon={<Ruler className="h-5 w-5 text-accent" />}
                    value={lengthValue}
                    setValue={setLengthValue}
                    fromUnit={fromLengthUnit}
                    setFromUnit={setFromLengthUnit}
                    toUnit={toLengthUnit}
                    setToUnit={setToLengthUnit || ''}
                    units={lengthUnits}
                    onConvert={convertLength}
                    onSwap={swapLengthUnits}
                    onReset={() => resetFields(setLengthValue, setLengthResult, setLengthCalculationDetails)}
                    result={lengthResult}
                    calculationDetails={lengthCalculationDetails}
                />
            )}

            {/* --- Contenido de Conversor de Peso/Masa --- */}
            {activeTab === 'weight' && (
                <ConversionCard
                    title="Peso/Masa"
                    description="Convierte entre diferentes unidades de peso y masa."
                    icon={<Weight className="h-5 w-5 text-accent" />}
                    value={weightValue}
                    setValue={setWeightValue}
                    fromUnit={fromWeightUnit}
                    setFromUnit={setFromWeightUnit}
                    toUnit={toWeightUnit}
                    setToUnit={setToWeightUnit}
                    units={weightUnits}
                    onConvert={convertWeight}
                    onSwap={swapWeightUnits}
                    onReset={() => resetFields(setWeightValue, setWeightResult, setWeightCalculationDetails)}
                    result={weightResult}
                    calculationDetails={weightCalculationDetails}
                />
            )}

            {/* --- Contenido de Conversor de Temperatura --- */}
            {activeTab === 'temperature' && (
                <ConversionCard
                    title="Temperatura"
                    description="Convierte entre diferentes unidades de temperatura."
                    icon={<ThermometerSnowflake className="h-5 w-5 text-accent" />}
                    value={tempValue}
                    setValue={setTempValue}
                    fromUnit={fromTempUnit}
                    setFromUnit={setFromTempUnit}
                    toUnit={toTempUnit}
                    setToUnit={setToTempUnit}
                    units={tempUnits}
                    onConvert={convertTemperature}
                    onSwap={swapTempUnits}
                    onReset={() => resetFields(setTempValue, setTempResult, setTempCalculationDetails)}
                    result={tempResult}
                    calculationDetails={tempCalculationDetails}
                />
            )}

            {/* --- Contenido de Conversor de Datos --- */}
            {activeTab === 'data' && (
                <ConversionCard
                    title="Datos"
                    description="Convierte entre diferentes unidades de almacenamiento de datos."
                    icon={<Database className="h-5 w-5 text-accent" />}
                    value={dataValue}
                    setValue={setDataValue}
                    fromUnit={fromDataUnit}
                    setFromUnit={setFromDataUnit}
                    toUnit={toDataUnit}
                    setToUnit={setToDataUnit}
                    units={dataUnits}
                    onConvert={convertData}
                    onSwap={swapDataUnits}
                    onReset={() => resetFields(setDataValue, setDataResult, setDataCalculationDetails)}
                    result={dataResult}
                    calculationDetails={dataCalculationDetails}
                />
            )}
        </LayoutSubSection>
    );
}
