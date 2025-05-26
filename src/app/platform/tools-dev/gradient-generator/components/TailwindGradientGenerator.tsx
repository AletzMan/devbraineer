'use client';
import { useState } from 'react';
import chroma from 'chroma-js';
import { Sparkles, Eye, Code, Download, Trash2 } from 'lucide-react';

interface ColorStop {
    color: string;
    position: number;
}

export default function TailwindGradientGenerator() {
    const [gradientStops, setGradientStops] = useState<ColorStop[]>([
        { color: 'from-red-500', position: 0 },
        { color: 'to-green-500', position: 1 },
    ]);
    const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
    const [direction, setDirection] = useState('to-r');
    const [copied, setCopied] = useState(false);

    type ColorName =
        | 'red'
        | 'orange'
        | 'amber'
        | 'yellow'
        | 'lime'
        | 'green'
        | 'emerald'
        | 'teal'
        | 'cyan'
        | 'sky'
        | 'blue'
        | 'indigo'
        | 'violet'
        | 'purple'
        | 'fuchsia'
        | 'pink'
        | 'rose'
        | 'gray'
        | 'zinc'
        | 'neutral'
        | 'stone';

    const colorOptions: ColorName[] = [
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose',
        'gray',
        'zinc',
        'neutral',
        'stone',
    ];

    const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

    const directionOptions = ['to-r', 'to-l', 'to-t', 'to-b', 'to-tr', 'to-tl', 'to-br', 'to-bl'];

    const handleAddStop = () => {
        // Solo permitir agregar un via- si ya hay from- y to-
        if (gradientStops.length >= 2) {
            return;
        }

        const newStop: ColorStop = {
            color: `via-${colorOptions[Math.floor(Math.random() * colorOptions.length)]}-500`,
            position: gradientStops.length === 1 ? 0.5 : Math.random(),
        };

        // Asegurarse de que el nuevo color sea via- si ya hay from- y to-
        if (gradientStops.length === 1) {
            newStop.color = `via-${newStop.color.replace('from-', '').replace('to-', '')}`;
        }

        setGradientStops([...gradientStops, newStop].sort((a, b) => a.position - b.position));
    };

    const handleRemoveStop = (index: number) => {
        const newStops = [...gradientStops];
        newStops.splice(index, 1);
        setGradientStops(newStops);
    };

    const handleColorChange = (index: number, color: string) => {
        console.log(color);
        const newStops = [...gradientStops];
        newStops[index].color = color;
        setGradientStops(newStops);
    };

    const handlePositionChange = (index: number, position: number) => {
        const newStops = [...gradientStops];
        newStops[index].position = position;
        setGradientStops(newStops.sort((a, b) => a.position - b.position));
    };

    const generateTailwindClasses = () => {
        // Asegurarse de que siempre haya un from- y un to-
        if (gradientStops.length === 1) {
            const currentColor = gradientStops[0].color;
            const [color, tone] = currentColor.replace('from-', '').replace('to-', '').split('-');
            const colorName = color as ColorName;

            // Si es from-, agregar un to-
            if (currentColor.startsWith('from-')) {
                return `bg-linear-to-${direction.replace('to-', '')} ${currentColor} to-${colorName}-${tone}`;
            }
            // Si es to-, agregar un from-
            return `bg-linear-to-${direction.replace('to-', '')} from-${colorName}-${tone} ${currentColor}`;
        }

        // Para gradientes con 2 o 3 colores
        const stops = gradientStops.map((stop) => {
            const baseColor = stop.color.replace('from-', '').replace('to-', '').replace('via-', '');
            const [color, tone] = baseColor.split('-');
            const colorName = color as ColorName;

            // Si es el primer color, usar from-
            if (gradientStops.indexOf(stop) === 0) {
                return `from-${colorName}-${tone}`;
            }
            // Si es el último color, usar to-
            if (gradientStops.indexOf(stop) === gradientStops.length - 1) {
                return `to-${colorName}-${tone}`;
            }
            // Si hay 3 colores, el medio será via-
            return `via-${colorName}-${tone}`;
        });

        const gradientTypeClass =
            gradientType === 'linear' ? `bg-linear-to-${direction.replace('to-', '')}` : 'bg-radial';

        return `${gradientTypeClass} ${stops.join(' ')}`;
    };

    const generateCSS = () => {
        const stops = gradientStops
            .map((stop) => {
                // Obtener el color base (sin el prefijo from/to)
                const baseColor = stop.color.replace('from-', '').replace('to-', '');
                // Separar el color y el tono
                const [color, tone] = baseColor.split('-');

                // Definir una paleta de colores base para Tailwind
                const colorPalette: Record<ColorName, string> = {
                    red: '#ef4444',
                    orange: '#f97316',
                    amber: '#f59e0b',
                    yellow: '#eab308',
                    lime: '#84cc16',
                    green: '#22c55e',
                    emerald: '#10b981',
                    teal: '#14b8a6',
                    cyan: '#06b6d4',
                    sky: '#0ea5e9',
                    blue: '#3b82f6',
                    indigo: '#6366f1',
                    violet: '#8b5cf6',
                    purple: '#a855f7',
                    fuchsia: '#d946ef',
                    pink: '#ec4899',
                    rose: '#f43f5e',
                    gray: '#9ca3af',
                    zinc: '#8b949e',
                    neutral: '#78716c',
                    stone: '#d1d5db',
                };

                // Obtener el color base de la paleta
                const baseColorAsColorName = color as ColorName;
                const baseHex = colorPalette[baseColorAsColorName] || '#ffffff';
                // Convertir el tono a número
                const toneNumber = parseInt(tone);

                // Ajustar la opacidad según el tono
                const opacity = (100 - toneNumber) / 100;

                // Convertir el color a formato rgba
                const rgbColor = chroma(baseHex).rgb();
                return `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${opacity}) ${stop.position * 100}%`;
            })
            .join(', ');

        if (gradientType === 'linear') {
            return `linear-gradient(${direction}, ${stops})`;
        }

        return `radial-gradient(circle at center, ${stops})`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateTailwindClasses());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setGradientStops([
            { color: 'from-red-500', position: 0 },
            { color: 'to-green-500', position: 1 },
        ]);
        setDirection('to-r');
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-col gap-4 mb-6">
                        <Eye className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold">Vista Previa</h3>
                    </div>

                    <div className="space-y-4 mb-8">
                        {gradientStops.map((stop, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-4 border-2 border-dashed rounded-lg p-2">
                                <div className="flex flex-col gap-2 flex-1">
                                    <select
                                        value={stop.color}
                                        onChange={(e) => handleColorChange(index, e.target.value)}
                                        className="select select-bordered">
                                        {colorOptions.map((color) => (
                                            <optgroup key={color} label={color}>
                                                {shades.map((shade) => (
                                                    <option key={`${color}-${shade}`} value={`from-${color}-${shade}`}>
                                                        from-{color}-{shade}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={stop.position}
                                    onChange={(e) => handlePositionChange(index, parseFloat(e.target.value))}
                                    className="flex-1"
                                    disabled={gradientStops.length === 2 && index === 1}
                                />
                                <button onClick={() => handleRemoveStop(index)} className="btn btn-error btn-sm">
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddStop}
                            className="btn btn-primary btn-sm"
                            disabled={gradientStops.length >= 2}>
                            + Agregar Punto de Color
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <select
                            value={gradientType}
                            onChange={(e) => setGradientType(e.target.value as 'linear' | 'radial')}
                            className="select select-bordered">
                            <option value="linear">Lineal</option>
                            <option value="radial">Radial</option>
                        </select>
                        {gradientType === 'linear' && (
                            <select
                                value={direction}
                                onChange={(e) => setDirection(e.target.value)}
                                className="select select-bordered">
                                {directionOptions.map((dir) => (
                                    <option key={dir} value={dir}>
                                        {dir.replace('to-', '')}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="mb-8">
                        <div className="preview-container p-4 rounded-lg ">
                            <div
                                className={`w-full h-64 relative ${generateTailwindClasses()}`}
                                style={{
                                    transition: 'background 0.3s ease',
                                    overflow: 'hidden',
                                }}>
                                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-center text-sm text-muted-foreground p-4">
                                        {generateTailwindClasses()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <pre className="p-4 bg-base-200 rounded-lg">{`class="${generateTailwindClasses()}"`}</pre>
                        <div className="flex gap-2">
                            <button onClick={handleCopy} className="btn btn-secondary btn-sm flex-1">
                                {copied ? 'Copiado!' : 'Copiar Clases'}
                            </button>
                            <button onClick={handleReset} className="btn btn-ghost btn-sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Resetear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
