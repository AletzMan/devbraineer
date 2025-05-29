'use client';
import { useState, useEffect, useCallback } from 'react';
import chroma from 'chroma-js';
import {
    Sparkles,
    Eye,
    Code,
    Download,
    Trash2,
    Check,
    Copy,
    Plus,
    RefreshCcw,
    RectangleHorizontal,
    Square,
    Expand,
    Circle,
} from 'lucide-react';
import Slider from 'rc-slider';

interface ColorStop {
    colorName: ColorName; // Ahora solo guarda el nombre del color, ej. 'red'
    tone: number; // Nuevo campo para el tono, ej. 500
    type: 'from' | 'via' | 'to';
    position: number;
}

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
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone';

export const tailwindColorFullPalette: Record<ColorName, Record<number, string>> = {
    red: {
        50: 'oklch(0.971 0.013 17.38)',
        100: 'oklch(0.936 0.032 17.717)',
        200: 'oklch(0.885 0.062 18.334)',
        300: 'oklch(0.808 0.114 19.571)',
        400: 'oklch(0.704 0.191 22.216)',
        500: 'oklch(0.637 0.237 25.331)',
        600: 'oklch(0.577 0.245 27.325)',
        700: 'oklch(0.505 0.213 27.518)',
        800: 'oklch(0.444 0.177 26.899)',
        900: 'oklch(0.396 0.141 25.723)',
        950: 'oklch(0.258 0.092 26.042)',
    },
    orange: {
        50: 'oklch(0.98 0.016 73.684)',
        100: 'oklch(0.954 0.038 75.164)',
        200: 'oklch(0.901 0.076 70.697)',
        300: 'oklch(0.837 0.128 66.29)',
        400: 'oklch(0.75 0.183 55.934)',
        500: 'oklch(0.705 0.213 47.604)',
        600: 'oklch(0.646 0.222 41.116)',
        700: 'oklch(0.553 0.195 38.402)',
        800: 'oklch(0.47 0.157 37.304)',
        900: 'oklch(0.408 0.123 38.172)',
        950: 'oklch(0.266 0.079 36.259)',
    },
    amber: {
        50: 'oklch(0.987 0.022 95.277)',
        100: 'oklch(0.962 0.059 95.617)',
        200: 'oklch(0.924 0.12 95.746)',
        300: 'oklch(0.879 0.169 91.605)',
        400: 'oklch(0.828 0.189 84.429)',
        500: 'oklch(0.769 0.188 70.08)',
        600: 'oklch(0.666 0.179 58.318)',
        700: 'oklch(0.555 0.163 48.998)',
        800: 'oklch(0.473 0.137 46.201)',
        900: 'oklch(0.414 0.112 45.904)',
        950: 'oklch(0.279 0.077 45.635)',
    },
    yellow: {
        50: 'oklch(0.987 0.026 102.212)',
        100: 'oklch(0.973 0.071 103.193)',
        200: 'oklch(0.945 0.129 101.54)',
        300: 'oklch(0.905 0.182 98.111)',
        400: 'oklch(0.852 0.199 91.936)',
        500: 'oklch(0.795 0.184 86.047)',
        600: 'oklch(0.681 0.162 75.834)',
        700: 'oklch(0.554 0.135 66.442)',
        800: 'oklch(0.476 0.114 61.907)',
        900: 'oklch(0.421 0.095 57.708)',
        950: 'oklch(0.286 0.066 53.813)',
    },
    lime: {
        50: 'oklch(0.986 0.031 120.757)',
        100: 'oklch(0.967 0.067 122.328)',
        200: 'oklch(0.938 0.127 124.321)',
        300: 'oklch(0.897 0.196 126.665)',
        400: 'oklch(0.841 0.238 128.85)',
        500: 'oklch(0.768 0.233 130.85)',
        600: 'oklch(0.648 0.2 131.684)',
        700: 'oklch(0.532 0.157 131.589)',
        800: 'oklch(0.453 0.124 130.933)',
        900: 'oklch(0.405 0.101 131.063)',
        950: 'oklch(0.274 0.072 132.109)',
    },
    green: {
        50: 'oklch(0.982 0.018 155.826)',
        100: 'oklch(0.962 0.044 156.743)',
        200: 'oklch(0.925 0.084 155.995)',
        300: 'oklch(0.871 0.15 154.449)',
        400: 'oklch(0.792 0.209 151.711)',
        500: 'oklch(0.723 0.219 149.579)',
        600: 'oklch(0.627 0.194 149.214)',
        700: 'oklch(0.527 0.154 150.069)',
        800: 'oklch(0.448 0.119 151.328)',
        900: 'oklch(0.393 0.095 152.535)',
        950: 'oklch(0.266 0.065 152.934)',
    },
    emerald: {
        50: 'oklch(0.979 0.021 166.113)',
        100: 'oklch(0.95 0.052 163.051)',
        200: 'oklch(0.905 0.093 164.15)',
        300: 'oklch(0.845 0.143 164.978)',
        400: 'oklch(0.765 0.177 163.223)',
        500: 'oklch(0.696 0.17 162.48)',
        600: 'oklch(0.596 0.145 163.225)',
        700: 'oklch(0.508 0.118 165.612)',
        800: 'oklch(0.432 0.095 166.913)',
        900: 'oklch(0.378 0.077 168.94)',
        950: 'oklch(0.262 0.051 172.552)',
    },
    teal: {
        50: 'oklch(0.984 0.014 180.72)',
        100: 'oklch(0.953 0.051 180.801)',
        200: 'oklch(0.91 0.096 180.426)',
        300: 'oklch(0.855 0.138 181.071)',
        400: 'oklch(0.777 0.152 181.912)',
        500: 'oklch(0.704 0.14 182.503)',
        600: 'oklch(0.6 0.118 184.704)',
        700: 'oklch(0.511 0.096 186.391)',
        800: 'oklch(0.437 0.078 188.216)',
        900: 'oklch(0.386 0.063 188.416)',
        950: 'oklch(0.277 0.046 192.524)',
    },
    cyan: {
        50: 'oklch(0.984 0.019 200.873)',
        100: 'oklch(0.956 0.045 203.388)',
        200: 'oklch(0.917 0.08 205.041)',
        300: 'oklch(0.865 0.127 207.078)',
        400: 'oklch(0.789 0.154 211.53)',
        500: 'oklch(0.715 0.143 215.221)',
        600: 'oklch(0.609 0.126 221.723)',
        700: 'oklch(0.52 0.105 223.128)',
        800: 'oklch(0.45 0.085 224.283)',
        900: 'oklch(0.398 0.07 227.392)',
        950: 'oklch(0.302 0.056 229.695)',
    },
    sky: {
        50: 'oklch(0.977 0.013 236.62)',
        100: 'oklch(0.951 0.026 236.824)',
        200: 'oklch(0.901 0.058 230.902)',
        300: 'oklch(0.828 0.111 230.318)',
        400: 'oklch(0.746 0.16 232.661)',
        500: 'oklch(0.685 0.169 237.323)',
        600: 'oklch(0.588 0.158 241.966)',
        700: 'oklch(0.5 0.134 242.749)',
        800: 'oklch(0.443 0.11 240.79)',
        900: 'oklch(0.391 0.09 240.876)',
        950: 'oklch(0.293 0.066 243.157)',
    },
    blue: {
        50: 'oklch(0.97 0.014 254.604)',
        100: 'oklch(0.932 0.032 255.585)',
        200: 'oklch(0.882 0.059 254.128)',
        300: 'oklch(0.809 0.105 251.813)',
        400: 'oklch(0.707 0.165 254.624)',
        500: 'oklch(0.623 0.214 259.815)',
        600: 'oklch(0.546 0.245 262.881)',
        700: 'oklch(0.488 0.243 264.376)',
        800: 'oklch(0.424 0.199 265.638)',
        900: 'oklch(0.379 0.146 265.522)',
        950: 'oklch(0.282 0.091 267.935)',
    },
    indigo: {
        50: 'oklch(0.962 0.018 272.314)',
        100: 'oklch(0.93 0.034 272.788)',
        200: 'oklch(0.87 0.065 274.039)',
        300: 'oklch(0.785 0.115 274.713)',
        400: 'oklch(0.673 0.182 276.935)',
        500: 'oklch(0.585 0.233 277.117)',
        600: 'oklch(0.511 0.262 276.966)',
        700: 'oklch(0.457 0.24 277.023)',
        800: 'oklch(0.398 0.195 277.366)',
        900: 'oklch(0.359 0.144 278.697)',
        950: 'oklch(0.257 0.09 281.288)',
    },
    violet: {
        50: 'oklch(0.969 0.016 293.756)',
        100: 'oklch(0.943 0.029 294.588)',
        200: 'oklch(0.894 0.057 293.283)',
        300: 'oklch(0.811 0.111 293.571)',
        400: 'oklch(0.702 0.183 293.541)',
        500: 'oklch(0.606 0.25 292.717)',
        600: 'oklch(0.541 0.281 293.009)',
        700: 'oklch(0.491 0.27 292.581)',
        800: 'oklch(0.432 0.232 292.759)',
        900: 'oklch(0.38 0.189 293.745)',
        950: 'oklch(0.283 0.141 291.089)',
    },
    purple: {
        50: 'oklch(0.977 0.014 308.299)',
        100: 'oklch(0.946 0.033 307.174)',
        200: 'oklch(0.902 0.063 306.703)',
        300: 'oklch(0.827 0.119 306.383)',
        400: 'oklch(0.714 0.203 305.504)',
        500: 'oklch(0.627 0.265 303.9)',
        600: 'oklch(0.558 0.288 302.321)',
        700: 'oklch(0.496 0.265 301.924)',
        800: 'oklch(0.438 0.218 303.724)',
        900: 'oklch(0.381 0.176 304.987)',
        950: 'oklch(0.291 0.149 302.717)',
    },
    fuchsia: {
        50: 'oklch(0.977 0.017 320.058)',
        100: 'oklch(0.952 0.037 318.852)',
        200: 'oklch(0.903 0.076 319.62)',
        300: 'oklch(0.833 0.145 321.434)',
        400: 'oklch(0.74 0.238 322.16)',
        500: 'oklch(0.667 0.295 322.15)',
        600: 'oklch(0.591 0.293 322.896)',
        700: 'oklch(0.518 0.253 323.949)',
        800: 'oklch(0.452 0.211 324.591)',
        900: 'oklch(0.401 0.17 325.612)',
        950: 'oklch(0.293 0.136 325.661)',
    },
    pink: {
        50: 'oklch(0.971 0.014 343.198)',
        100: 'oklch(0.948 0.028 342.258)',
        200: 'oklch(0.899 0.061 343.231)',
        300: 'oklch(0.823 0.12 346.018)',
        400: 'oklch(0.718 0.202 349.761)',
        500: 'oklch(0.656 0.241 354.308)',
        600: 'oklch(0.592 0.249 0.584)', // Este valor de hue (0.584) parece un error o una normalización. Si causa problemas, considera redondearlo o usar un valor cercano en 360.
        700: 'oklch(0.525 0.223 3.958)',
        800: 'oklch(0.459 0.187 3.815)',
        900: 'oklch(0.408 0.153 2.432)',
        950: 'oklch(0.284 0.109 3.907)',
    },
    rose: {
        50: 'oklch(0.969 0.015 12.422)',
        100: 'oklch(0.941 0.03 12.58)',
        200: 'oklch(0.892 0.058 10.001)',
        300: 'oklch(0.81 0.117 11.638)',
        400: 'oklch(0.712 0.194 13.428)',
        500: 'oklch(0.645 0.246 16.439)',
        600: 'oklch(0.586 0.253 17.585)',
        700: 'oklch(0.514 0.222 16.935)',
        800: 'oklch(0.455 0.188 13.697)',
        900: 'oklch(0.41 0.159 10.272)',
        950: 'oklch(0.271 0.105 12.094)',
    },
    slate: {
        50: 'oklch(0.984 0.003 247.858)',
        100: 'oklch(0.968 0.007 247.896)',
        200: 'oklch(0.929 0.013 255.508)',
        300: 'oklch(0.869 0.022 252.894)',
        400: 'oklch(0.704 0.04 256.788)',
        500: 'oklch(0.554 0.046 257.417)',
        600: 'oklch(0.446 0.043 257.281)',
        700: 'oklch(0.372 0.044 257.287)',
        800: 'oklch(0.279 0.041 260.031)',
        900: 'oklch(0.208 0.042 265.755)',
        950: 'oklch(0.129 0.042 264.695)',
    },
    gray: {
        50: 'oklch(0.985 0.002 247.839)',
        100: 'oklch(0.967 0.003 264.542)',
        200: 'oklch(0.928 0.006 264.531)',
        300: 'oklch(0.872 0.01 258.338)',
        400: 'oklch(0.707 0.022 261.325)',
        500: 'oklch(0.551 0.027 264.364)',
        600: 'oklch(0.446 0.03 256.802)',
        700: 'oklch(0.373 0.034 259.733)',
        800: 'oklch(0.278 0.033 256.848)',
        900: 'oklch(0.21 0.034 264.665)',
        950: 'oklch(0.13 0.028 261.692)',
    },
    zinc: {
        50: 'oklch(0.985 0 0)',
        100: 'oklch(0.967 0.001 286.375)',
        200: 'oklch(0.92 0.004 286.32)',
        300: 'oklch(0.871 0.006 286.286)',
        400: 'oklch(0.705 0.015 286.067)',
        500: 'oklch(0.552 0.016 285.938)',
        600: 'oklch(0.442 0.017 285.786)',
        700: 'oklch(0.37 0.013 285.805)',
        800: 'oklch(0.274 0.006 286.033)',
        900: 'oklch(0.21 0.006 285.885)',
        950: 'oklch(0.141 0.005 285.823)',
    },
    neutral: {
        50: 'oklch(0.985 0 0)',
        100: 'oklch(0.97 0 0)',
        200: 'oklch(0.922 0 0)',
        300: 'oklch(0.87 0 0)',
        400: 'oklch(0.708 0 0)',
        500: 'oklch(0.556 0 0)',
        600: 'oklch(0.439 0 0)',
        700: 'oklch(0.371 0 0)',
        800: 'oklch(0.269 0 0)',
        900: 'oklch(0.205 0 0)',
        950: 'oklch(0.145 0 0)',
    },
    stone: {
        50: 'oklch(0.985 0.001 106.423)',
        100: 'oklch(0.97 0.001 106.424)',
        200: 'oklch(0.923 0.003 48.717)',
        300: 'oklch(0.869 0.005 56.366)',
        400: 'oklch(0.709 0.01 56.259)',
        500: 'oklch(0.553 0.013 58.071)',
        600: 'oklch(0.444 0.011 73.639)',
        700: 'oklch(0.374 0.01 67.558)',
        800: 'oklch(0.268 0.007 34.298)',
        900: 'oklch(0.216 0.006 56.043)',
        950: 'oklch(0.147 0.004 49.25)',
    },
};

interface Color {
    name: string;
    value: ColorName;
}

const colorOptions: Color[] = [
    { name: 'Red', value: 'red' },
    { name: 'Orange', value: 'orange' },
    { name: 'Amber', value: 'amber' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Lime', value: 'lime' },
    { name: 'Green', value: 'green' },
    { name: 'Emerald', value: 'emerald' },
    { name: 'Teal', value: 'teal' },
    { name: 'Cyan', value: 'cyan' },
    { name: 'Sky', value: 'sky' },
    { name: 'Blue', value: 'blue' },
    { name: 'Indigo', value: 'indigo' },
    { name: 'Violet', value: 'violet' },
    { name: 'Purple', value: 'purple' },
    { name: 'Fuchsia', value: 'fuchsia' },
    { name: 'Pink', value: 'pink' },
    { name: 'Rose', value: 'rose' },
    { name: 'Gray', value: 'gray' },
    { name: 'Zinc', value: 'zinc' },
    { name: 'Neutral', value: 'neutral' },
    { name: 'Stone', value: 'stone' },
    { name: 'Slate', value: 'slate' },
];

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
    gray: '#6b7280',
    zinc: '#71717a',
    neutral: '#737373',
    slate: '#4b5563',
    stone: '#a8a29e',
};

const directionOptions = [
    { value: 'to-r', label: 'Left to Right' },
    { value: 'to-l', label: 'Right to Left' },
    { value: 'to-t', label: 'Bottom to Top' },
    { value: 'to-b', label: 'Top to Bottom' },
    { value: 'to-tr', label: 'Bottom Left to Top Right' },
    { value: 'to-tl', label: 'Bottom Right to Top Left' },
    { value: 'to-br', label: 'Top Left to Bottom Right' },
    { value: 'to-bl', label: 'Top Right to Bottom Left' },
];

export default function TailwindGradientGenerator() {
    const [gradientStops, setGradientStops] = useState<ColorStop[]>([
        { colorName: 'red', tone: 500, type: 'from', position: 0 },
        { colorName: 'green', tone: 500, type: 'to', position: 1 },
    ]);
    const [gradientType, setGradientType] = useState<'linear' | 'radial' | 'conic'>('linear');
    const [currentColor, setCurrentColor] = useState<string[]>([]);
    const [direction, setDirection] = useState('to-r');
    const [copied, setCopied] = useState(false);
    const [angle, setAngle] = useState(0);
    const [centerX, setCenterX] = useState(50);
    const [centerY, setCenterY] = useState(50);
    const [typeView, setTypeView] = useState<'rectangle' | 'circle' | 'square' | 'ellipse'>('rectangle');
    const [sizeView, setSizeView] = useState(1);

    useEffect(() => {
        const newColorsArray: string[] = gradientStops.map((stop) => {
            let finalColorString: string;

            // Ahora, asumimos que tailwindColorFullPalette[stop.colorName] siempre será un objeto de tonos.
            const tonePalette = tailwindColorFullPalette[stop.colorName];

            // Verificamos que tonePalette es un objeto y que el tono existe en él.
            if (typeof tonePalette === 'object' && tonePalette !== null && stop.tone in tonePalette) {
                finalColorString = tonePalette[stop.tone];
            } else {
                console.warn(`Color tone not found or invalid: ${stop.colorName}-${stop.tone}. Defaulting to #ffffff.`);
                finalColorString = '#ffffff';
            }
            return finalColorString;
        });

        // Solo actualiza el estado si los colores son diferentes para evitar bucles innecesarios
        if (JSON.stringify(newColorsArray) !== JSON.stringify(currentColor)) {
            setCurrentColor(newColorsArray);
        }
    }, [gradientStops, direction, gradientType, currentColor]);

    useEffect(() => {
        const handlers = document.querySelectorAll('.handler_positions .rc-slider-handle');

        handlers?.forEach((child, index) => {
            const input = child as HTMLInputElement;

            // Aplica color al "handler"
            input.style.backgroundColor = colorPalette[gradientStops[index].colorName];
            input.style.borderColor = chroma(colorPalette[gradientStops[index].colorName]).darken(0.9).hex();

            // Verifica si ya tiene un hijo span con clase "arrow-indicator"
            const existingArrow = input.querySelector('.arrow-indicator');
            let beforeEl: HTMLSpanElement | null = input.querySelector('.arrow-indicator');
            if (!existingArrow && !beforeEl) {
                beforeEl = document.createElement('span');
                beforeEl.textContent = `${(gradientStops[index].position * 100).toFixed(0)}%`;
                beforeEl.className = 'arrow-indicator';
                beforeEl.style.position = 'absolute';
                beforeEl.style.left = '50%';
                beforeEl.style.top = '-25px';
                beforeEl.style.transform = 'translateX(-50%)';
                beforeEl.style.color = 'text-base-content';
                beforeEl.style.backgroundColor = 'var(--color-base-100)';
                beforeEl.style.border = '1px solid var(--color-gray-600)';
                beforeEl.style.alignItems = 'center';
                beforeEl.style.justifyContent = 'center';
                beforeEl.style.textAlign = 'center';
                beforeEl.style.borderRadius = '4px';
                beforeEl.style.width = '30px';
                beforeEl.style.height = '20px';
                beforeEl.style.pointerEvents = 'none';
                beforeEl.style.fontSize = '12px';
                beforeEl.style.transition = 'color 0.3s ease';
                beforeEl.style.display = 'none';
                input.appendChild(beforeEl);
                input.addEventListener('mouseenter', () => {
                    beforeEl!.style.display = 'block';
                });
                input.addEventListener('mouseleave', () => {
                    beforeEl!.style.display = 'none';
                });
            } else {
                beforeEl!.textContent = `${(gradientStops[index].position * 100).toFixed(0)}%`;
            }
        });
    }, [gradientStops]);

    const handleAddStop = () => {
        const hasFrom = gradientStops.some((stop) => stop.type === 'from');
        const hasTo = gradientStops.some((stop) => stop.type === 'to');
        const hasVia = gradientStops.some((stop) => stop.type === 'via');

        if (hasFrom && hasTo && !hasVia) {
            const newStop: ColorStop = {
                colorName: colorOptions[Math.floor(Math.random() * colorOptions.length)].value,
                tone: 500, // Tono por defecto para el nuevo 'via'
                type: 'via',
                position: 0.5,
            };
            setGradientStops([...gradientStops, newStop].sort((a, b) => a.position - b.position));
        }
    };

    const handleRemoveStop = (index: number) => {
        const stopToRemove = gradientStops[index];
        if (gradientStops.length === 2 && (stopToRemove.type === 'from' || stopToRemove.type === 'to')) {
            return;
        }

        const newStops = gradientStops.filter((_, i) => i !== index);
        setGradientStops(newStops.sort((a, b) => a.position - b.position));
    };

    const handleColorNameChange = (index: number, newColorName: ColorName) => {
        const newStops = [...gradientStops];
        newStops[index].colorName = newColorName;
        setGradientStops(newStops);
    };

    const handleToneChange = (index: number, newTone: number) => {
        const newStops = [...gradientStops];
        newStops[index].tone = newTone;
        setGradientStops(newStops);
    };

    const generateTailwindClasses = () => {
        const sortedStops = [...gradientStops].sort((a, b) => a.position - b.position);

        const stops = sortedStops.map((stop) => {
            return `${stop.type}-${stop.colorName}-${stop.tone} ${stop.type}-${stop.position * 100}%`;
        });

        const gradientTypeClass =
            gradientType === 'linear'
                ? `bg-linear-${direction}`
                : gradientType === 'radial'
                  ? `bg-radial-[at_${centerX}%_${centerY}%]`
                  : 'bg-conic';

        if (gradientType === 'conic') {
            return `${gradientTypeClass}${angle > 0 ? `-${angle}` : ''} ${stops.join(' ')}`;
        }
        return `${gradientTypeClass} ${stops.join(' ')}  `;
    };

    const generateCSS = useCallback(() => {
        const sortedStops = [...gradientStops].sort((a, b) => a.position - b.position);

        const stops = sortedStops
            .map((stop) => {
                const { colorName, tone } = stop;

                // Ahora, asumimos que tailwindColorFullPalette[colorName] siempre será un objeto de tonos.
                const tonePalette = tailwindColorFullPalette[colorName];

                let hexColor: string;
                if (typeof tonePalette === 'object' && tonePalette !== null && stop.tone in tonePalette) {
                    // Si el color y el tono existen en la paleta
                    hexColor = tonePalette[stop.tone];
                } else {
                    // Fallback si el color o tono no se encuentran
                    console.warn(`Color tone not found or invalid: ${colorName}-${tone}. Defaulting to #ffffff.`);
                    hexColor = '#ffffff';
                }

                return `${hexColor} ${stop.position * 100}%`;
            })
            .join(', ');

        let cssDirection = '';
        switch (direction) {
            case 'to-r':
                cssDirection = 'to right';
                break;
            case 'to-l':
                cssDirection = 'to left';
                break;
            case 'to-t':
                cssDirection = 'to top';
                break;
            case 'to-b':
                cssDirection = 'to bottom';
                break;
            case 'to-tr':
                cssDirection = 'to top right';
                break;
            case 'to-tl':
                cssDirection = 'to top left';
                break;
            case 'to-br':
                cssDirection = 'to bottom right';
                break;
            case 'to-bl':
                cssDirection = 'to bottom left';
                break;
            default:
                cssDirection = 'to right';
        }

        if (gradientType === 'linear') {
            return `linear-gradient(${cssDirection}, ${stops})`;
        }

        if (gradientType === 'radial') {
            return `radial-gradient(circle at ${centerX}% ${centerY}%, ${stops})`;
        }

        return `conic-gradient(from ${angle}deg, ${stops})`;
    }, [gradientStops, direction, gradientType, angle, centerX, centerY]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generateTailwindClasses());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setGradientStops([
            { colorName: 'red', tone: 500, type: 'from', position: 0 },
            { colorName: 'green', tone: 500, type: 'to', position: 1 },
        ]);
        setDirection('to-r');
    };

    useEffect(() => {
        setGradientStops((prevStops) => {
            let updatedStops = [...prevStops].sort((a, b) => a.position - b.position);

            if (updatedStops.length > 0) {
                updatedStops[0].type = 'from';
                updatedStops[0].position = 0;
            }
            if (updatedStops.length > 1) {
                updatedStops[updatedStops.length - 1].type = 'to';
                updatedStops[updatedStops.length - 1].position = 1;
            }

            if (updatedStops.length === 3) {
                updatedStops[1].type = 'via';
                updatedStops[1].position = 0.5;
            } else if (updatedStops.length > 3) {
                updatedStops = updatedStops.slice(0, 3);
                updatedStops[0].type = 'from';
                updatedStops[0].position = 0;
                updatedStops[1].type = 'via';
                updatedStops[1].position = 0.5;
                updatedStops[2].type = 'to';
                updatedStops[2].position = 1;
            }
            return updatedStops;
        });
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 bg-base-100 border border-base-300 p-2 rounded-sm">
                    <div className="grid grid-cols-2 gap-6 bg-base-200 p-2 pb-6">
                        <label className="flex flex-col items-start label">
                            <span className="label-text text-sm">Tipo</span>
                            <select
                                value={gradientType}
                                onChange={(e) => setGradientType(e.target.value as 'linear' | 'radial' | 'conic')}
                                className="select select-bordered w-full">
                                <option value="linear">Lineal</option>
                                <option value="radial">Radial</option>
                                <option value="conic">Conica</option>
                            </select>
                        </label>
                        {gradientType === 'linear' && (
                            <label className="flex flex-col items-start label">
                                <span className="label-text text-sm">Direccion</span>
                                <select
                                    value={direction}
                                    onChange={(e) => setDirection(e.target.value)}
                                    className="select select-bordered w-full">
                                    {directionOptions.map((dir) => (
                                        <option key={dir.value} value={dir.value}>
                                            {dir.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        )}
                        {gradientType === 'radial' && (
                            <div className="w-full">
                                <label className="label flex flex-col items-start">
                                    <span className="label-text text-sm">Centro del gradiente</span>
                                    <div className="flex gap-2 w-full">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={centerX}
                                            onChange={(e) => setCenterX(parseInt(e.target.value))}
                                            className="range range-xs"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={centerY}
                                            onChange={(e) => setCenterY(parseInt(e.target.value))}
                                            className="range range-xs"
                                        />
                                    </div>
                                    <span className="text-sm text-muted-foreground w-full text-center">
                                        {centerX}% x {centerY}%
                                    </span>
                                </label>
                            </div>
                        )}
                        {gradientType === 'conic' && (
                            <label className="flex flex-col items-start label">
                                <span className="label-text text-sm">Angulo</span>
                                <input
                                    type="range"
                                    className="range range-sm w-full"
                                    min="0"
                                    max="360"
                                    step="1"
                                    value={angle}
                                    onChange={(e) => setAngle(Number(e.currentTarget.value))}
                                />
                                <span className="text-sm text-center w-full">{angle}°</span>
                            </label>
                        )}
                    </div>
                    <label className="label flex flex-col gap-7 rounded-sm p-4 pb-6 bg-base-200">
                        <span className="label-text text-sm">Posiciones</span>

                        <Slider
                            className="handler_positions"
                            min={0}
                            styles={{
                                handle: {
                                    backgroundColor: 'var(--color-base-200)',
                                    borderColor: 'var(--color-base-content)',
                                    opacity: 1,
                                    borderRadius: '2px',
                                    borderWidth: '1px',
                                    height: '24px',
                                    width: '8px',
                                    transform: 'translateY(-5px) translateX(-4px)',
                                },
                                track: {
                                    backgroundColor: 'var(--color-primary)',
                                    height: '4px',
                                },
                                rail: {
                                    backgroundColor: 'var(--color-base-content)',
                                    height: '4px',
                                },
                            }}
                            range={{ draggableTrack: true }}
                            allowCross={false}
                            max={1}
                            value={gradientStops.map((stop) => stop.position)}
                            onChange={(values) => {
                                if (!Array.isArray(values)) {
                                    return;
                                }
                                setGradientStops(
                                    gradientStops.map((stop, index) => ({
                                        ...stop,
                                        position: values[index],
                                    }))
                                );
                            }}
                            step={0.01}
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-2 border-b border-base-content/20 pb-4 mb-4">
                        <button
                            onClick={handleAddStop}
                            className="btn btn-accent btn-sm w-full"
                            disabled={gradientStops.length >= 3}>
                            <Plus className="size-4" />
                            Agregar Color Vía
                        </button>
                        <button onClick={handleReset} className="btn btn-soft btn-sm w-full">
                            <RefreshCcw className="size-4" />
                            Resetear
                        </button>
                    </div>

                    <div className="space-y-4">
                        {gradientStops.map((stop, index) => {
                            const stopType = stop.type;
                            return (
                                <div
                                    key={index}
                                    className="relative flex flex-col w-full gap-1 items-center bg-base-200 border-1 border-dashed border-base-content/20 rounded-sm p-2 pb-3">
                                    <span className="absolute -top-2 bg-base-300 rounded-sm border border-base-content/20 border-dashed left-[calc(50%-1.5rem)] w-12 text-secondary  text-center text-sm font-semibold">
                                        {stopType}
                                    </span>
                                    <div className="flex justify-center items-center gap-2 w-full mt-4">
                                        <div
                                            className="size-8 rounded-sm"
                                            style={{ backgroundColor: currentColor[index] }}
                                        />
                                        <div className="flex flex-col gap-2 flex-1">
                                            {/* SELECT para el nombre del color */}
                                            <select
                                                value={stop.colorName}
                                                onChange={(e) =>
                                                    handleColorNameChange(index, e.target.value as ColorName)
                                                }
                                                className="select select-sm">
                                                {colorOptions.map((color) => (
                                                    <option key={color.value} value={color.value}>
                                                        {color.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {gradientStops.length === 3 && stop.type === 'via' && (
                                            <button
                                                onClick={() => handleRemoveStop(index)}
                                                className="btn btn-error btn-sm absolute top-2 right-2">
                                                <Trash2 className="size-4" />
                                            </button>
                                        )}
                                    </div>
                                    {/* SLIDER para el tono */}
                                    <div className="flex gap-2 items-center w-full p-2">
                                        <div className="flex flex-col gap-2 items-center w-full pb-2">
                                            {/* Mostrar el tono actual */}
                                            <span className="w-12 text-center text-sm font-semibold">{stop.tone}</span>
                                            <Slider
                                                min={50}
                                                max={950}
                                                step={null}
                                                defaultValue={stop.tone}
                                                onChange={(value) => handleToneChange(index, value as number)}
                                                marks={{
                                                    50: 50,
                                                    100: 100,
                                                    200: 200,
                                                    300: 300,
                                                    400: 400,
                                                    500: 500,
                                                    600: 600,
                                                    700: 700,
                                                    800: 800,
                                                    900: 900,
                                                    950: 950,
                                                }}
                                                styles={{
                                                    track: {
                                                        backgroundColor: 'var(--color-primary)',
                                                        height: '4px',
                                                    },
                                                    rail: {
                                                        backgroundColor: 'var(--color-base-content)',
                                                        height: '4px',
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-4 bg-base-100 border border-base-300 rounded-sm h-full">
                    <div className="flex flex-col gap-2 p-2 rounded-lg h-full">
                        <div className="flex gap-4 w-full">
                            <div className="flex items-center gap-2 w-full ">
                                <Eye className="h-5 w-5 text-muted-foreground " />
                                <h3 className="font-semibold w-full">Vista Previa</h3>
                            </div>
                            <label className="label flex flex-col items-start w-full">
                                <span className="label-text text-sm">Tamaño</span>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={sizeView}
                                    className="range range-primary w-full"
                                    onChange={(e) => setSizeView(Number(e.target.value))}
                                />
                            </label>
                            <label className="label flex flex-col items-start">
                                <span className="label-text text-sm">Tipo de Vista</span>
                                <div className="join">
                                    <button
                                        className={`join-item btn btn-sm btn-soft ${typeView === 'rectangle' ? 'btn-active btn-primary' : 'btn-default'}`}
                                        type="button"
                                        name="options"
                                        onClick={() => setTypeView('rectangle')}>
                                        <RectangleHorizontal className="size-4" />
                                    </button>
                                    <button
                                        className={`join-item btn btn-sm btn-soft ${typeView === 'circle' ? 'btn-active btn-primary' : 'btn-default'}`}
                                        type="button"
                                        name="options"
                                        onClick={() => setTypeView('circle')}>
                                        <Circle className="size-4" />
                                    </button>
                                    <button
                                        className={`join-item btn btn-sm btn-soft ${typeView === 'square' ? 'btn-active btn-primary' : 'btn-default'}`}
                                        type="button"
                                        name="options"
                                        onClick={() => setTypeView('square')}>
                                        <Square className="size-4" />
                                    </button>
                                </div>
                            </label>
                        </div>
                        <div className="relative bg-lines p-2 rounded-sm border border-base-300 ">
                            <div
                                className={`w-full h-full relative  rounded-sm overflow-hidden`}
                                style={{
                                    transition: 'background 0.3s ease',
                                    overflow: 'hidden',
                                    background: generateCSS(),
                                    transform: `scale(${sizeView})`,
                                    borderRadius: typeView === 'circle' ? '50%' : '0.25em',
                                    aspectRatio:
                                        typeView === 'rectangle'
                                            ? '2/1'
                                            : typeView === 'square' || typeView === 'circle'
                                              ? '1/1'
                                              : 'auto',
                                    height: typeView === 'rectangle' ? '50%' : '100%',
                                    marginTop: typeView === 'rectangle' ? '17%' : '0',
                                }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                <div className="flex flex-col gap-2">
                                    <div className="text-center text-sm text-muted-foreground p-4">
                                        {generateTailwindClasses()}
                                    </div>
                                    <button onClick={handleCopy} className="btn btn-secondary btn-sm">
                                        {copied ? 'Copiado!' : 'Copiar Clases'}
                                        {copied ? (
                                            <Check className="h-4 w-4 ml-2" />
                                        ) : (
                                            <Copy className="h-4 w-4 ml-2" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
