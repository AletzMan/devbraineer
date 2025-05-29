'use client';
import { useState, useEffect, useMemo } from 'react';
import chroma from 'chroma-js';
import {
    Sparkles,
    Eye,
    Code,
    Download,
    RotateCcw,
    RotateCw,
    Trash2,
    RefreshCw,
    RefreshCcw,
    GripHorizontal,
    GripVertical,
    Plus,
    Check,
    Copy,
    ArrowUpDown,
    CircleSmall,
    ClipboardPasteIcon,
    RectangleHorizontal,
    Circle,
    Square,
    Expand,
} from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDebounce } from '@/app/hooks/useDebounce';
import Slider from 'rc-slider';
import toast from 'react-hot-toast';
interface GradientStop {
    color: string;
    position: number;
}

export default function GradientGenerator() {
    const [gradientStops, setGradientStops] = useState<GradientStop[]>([
        { color: '#FF0000', position: 0 },
        { color: '#00FF00', position: 1 },
    ]);
    const [gradientType, setGradientType] = useState<'linear' | 'radial' | 'conic'>('linear');
    const [direction, setDirection] = useState('to right');
    const [copied, setCopied] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [centerX, setCenterX] = useState(50);
    const [centerY, setCenterY] = useState(50);
    const [sizeView, setSizeView] = useState(1);
    const [typeView, setTypeView] = useState<'rectangle' | 'circle' | 'square'>('rectangle');
    const debouncedUpdateStops = useMemo(
        () =>
            useDebounce((stops: GradientStop[]) => {
                setGradientStops(stops);
            }, 300),
        []
    );

    useEffect(() => {
        const handlers = document.querySelectorAll('.handler_positions .rc-slider-handle');

        handlers?.forEach((child, index) => {
            const input = child as HTMLInputElement;

            // Aplica color al "handler"
            input.style.backgroundColor = gradientStops[index].color;
            input.style.borderColor = chroma(gradientStops[index].color).darken(0.9).hex();

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
        const newStop = {
            color: chroma.random().hex(),
            position: 1,
        };
        const allStops = [...gradientStops.map((s) => ({ ...s })), newStop];

        const redistributed = allStops
            .sort((a, b) => a.position - b.position)
            .map((stop, index, arr) => ({
                ...stop,
                // Calcula la posición y la redondea a 2 decimales
                // Convertir a número con parseFloat() si necesitas que sea un número,
                // de lo contrario toFixed() devuelve una cadena.
                position: parseFloat((index / (arr.length - 1)).toFixed(2)),
            }));

        setGradientStops(redistributed);
    };
    const handleRemoveStop = (index: number) => {
        const newStops = [...gradientStops];
        newStops.splice(index, 1);
        setGradientStops(newStops);
    };

    const handleColorChange = (index: number, color: string) => {
        const newStops = [...gradientStops];
        newStops[index].color = color;
        debouncedUpdateStops(newStops);
    };

    const DraggableStop = ({
        index,
        stop,
        onColorChange,
        onRemove,
    }: {
        index: number;
        stop: GradientStop;
        onColorChange: (color: string) => void;
        onRemove: () => void;
    }) => {
        const [{ isDragging }, drag, preview] = useDrag({
            type: 'stop',
            item: { index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        const [, drop] = useDrop({
            accept: 'stop',
            hover(item: { index: number }) {
                const dragIndex = item.index;
                const hoverIndex = index;

                if (dragIndex === hoverIndex) return;

                const newStops = [...gradientStops];
                const [dragged] = newStops.splice(dragIndex, 1);
                newStops.splice(hoverIndex, 0, dragged);

                newStops.forEach((stop, newIndex) => {
                    stop.position = newIndex / (newStops.length - 1);
                });

                setGradientStops(newStops);
                item.index = hoverIndex;
            },
        });

        return (
            <div
                ref={(node) => {
                    if (node) preview(node);
                }}
                className="flex items-center space-x-2 transition-all duration-200"
                style={{
                    opacity: isDragging ? 0.7 : 1,
                }}>
                <CircleSmall className="size-4 ml-2 text-base-content/40" />
                <div
                    className="flex items-center gap-2 border-1 border-base-content/40 border-dashed rounded-md p-1 w-full"
                    style={{
                        backgroundColor: isDragging ? '#f3f4f630' : 'var(--color-base-300)',
                    }}>
                    <div
                        className="flex items-center justify-center size-6 border-1 border-base-content/10 bg-base-content/10 rounded-sm cursor-move"
                        ref={(node) => {
                            if (node) drag(drop(node));
                        }}>
                        <GripVertical className="size-5 text-base-content/50" />
                    </div>
                    <div
                        className="border-1 border-base-content/40 p-0 rounded-sm h-6 w-12 cursor-pointer"
                        style={{ backgroundColor: stop.color }}>
                        <input
                            type="color"
                            value={stop.color}
                            onInput={(e) => onColorChange(e.currentTarget.value)}
                            className="input size-6 opacity-0 cursor-pointer "
                        />
                    </div>
                    <label className="input input-xs w-24 ">
                        <ClipboardPasteIcon className=" text-base-content/50 " />
                        <input
                            type="text"
                            value={stop.color}
                            onFocus={(e) => e.currentTarget.select()}
                            onChange={(e) => {
                                const inputValue = e.currentTarget.value;
                                try {
                                    const validHexColor = chroma(inputValue).hex();
                                    onColorChange(validHexColor);
                                } catch (error) {
                                    toast.error('Color inválido ingrese un color en formato hexadecimal');
                                }
                            }}
                            className=" text-center"
                        />
                    </label>
                    <div className="flex items-center justify-center text-xs w-12 text-center bg-base-content/10 rounded-sm h-6">
                        {(stop.position * 100).toFixed(0)}%
                    </div>
                    <button onClick={onRemove} className="btn btn-soft btn-error btn-xs">
                        <Trash2 className="size-4" />
                    </button>
                </div>
            </div>
        );
    };

    const handleReset = () => {
        setGradientStops([
            { color: '#FF0000', position: 0 },
            { color: '#00FF00', position: 1 },
        ]);
        setDirection('to right');
        setRotation(0);
        setCenterX(50);
        setCenterY(50);
    };

    const generateCSS = () => {
        const stops = gradientStops.map((stop) => `${stop.color} ${stop.position * 100}%`).join(', ');

        if (gradientType === 'linear') {
            return `linear-gradient(${direction}, ${stops})`;
        }

        const angle = (rotation * Math.PI) / 180;

        const displacement = 0;
        const offsetX = Math.cos(angle) * displacement;
        const offsetY = Math.sin(angle) * displacement;

        const newX = centerX + offsetX;
        const newY = centerY + offsetY;

        // Asegurarnos que las coordenadas estén dentro del rango 0-100
        const finalX = Math.max(0, Math.min(100, newX));
        const finalY = Math.max(0, Math.min(100, newY));

        if (gradientType === 'conic') {
            return `conic-gradient(from ${rotation}deg, ${stops})`;
        }

        return `radial-gradient(circle at ${finalX.toFixed(0)}% ${finalY.toFixed(0)}%, ${stops})`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCSS());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 bg-base-100 shadow-xl h-[calc(100svh-10rem)] overflow-hidden">
                    <div className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2 bg-base-100 border border-base-300 p-2 rounded-sm">
                                <div className="grid grid-cols-2 gap-4 w-full bg-base-200 p-2 rounded-sm">
                                    <label className="label flex flex-col items-start ">
                                        <span className="label-text text-sm">Tipo de gradiente</span>
                                        <select
                                            value={gradientType}
                                            onChange={(e) =>
                                                setGradientType(e.target.value as 'linear' | 'radial' | 'conic')
                                            }
                                            className="select select-bordered">
                                            <option value="linear">Lineal</option>
                                            <option value="radial">Radial</option>
                                            <option value="conic">Conica</option>
                                        </select>
                                    </label>
                                    {gradientType === 'linear' && (
                                        <label className="label flex flex-col items-start ">
                                            <span className="label-text text-sm">Dirección</span>
                                            <select
                                                value={direction}
                                                onChange={(e) => setDirection(e.target.value)}
                                                className="select select-bordered">
                                                <option value="to right">Izquierda a Derecha</option>
                                                <option value="to left">Derecha a Izquierda</option>
                                                <option value="to top">Abajo a Arriba</option>
                                                <option value="to bottom">Arriba a Abajo</option>
                                                <option value="to top right">Diagonal (Arriba Derecha)</option>
                                                <option value="to top left">Diagonal (Arriba Izquierda)</option>
                                                <option value="to bottom right">Diagonal (Abajo Derecha)</option>
                                                <option value="to bottom left">Diagonal (Abajo Izquierda)</option>
                                            </select>
                                        </label>
                                    )}
                                    {gradientType === 'radial' && (
                                        <label className="label flex flex-col items-start ">
                                            <span className="label-text text-sm">Centro del gradiente</span>
                                            <div className="flex flex-col">
                                                <div className="flex gap-2">
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
                                            </div>
                                        </label>
                                    )}
                                    {gradientType === 'conic' && (
                                        <label className="label flex flex-col items-start ">
                                            <span className="label-text text-sm">Rotación</span>
                                            <input
                                                type="range"
                                                min="0"
                                                max="360"
                                                value={rotation}
                                                onChange={(e) => setRotation(parseInt(e.target.value))}
                                                className="range range-xs"
                                            />
                                        </label>
                                    )}
                                </div>
                                <div className="bg-base-200 p-4 pt-2 pb-4 rounded-sm">
                                    <label className="label flex flex-col items-center gap-7">
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
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={handleAddStop} className="btn btn-accent btn-sm w-full">
                                        <Plus className="size-4 mr-2" />
                                        Agregar Punto de Color
                                    </button>
                                    <button onClick={handleReset} className="btn btn-soft btn-sm w-full">
                                        <RefreshCcw className="size-4 mr-2" />
                                        Resetear
                                    </button>
                                </div>
                                <div className="space-y-2 h-[calc(100svh-24.5rem)] overflow-y-auto scrollbar-thin border border-base-content/10 p-2 rounded-sm">
                                    {gradientStops.map((stop, index) => (
                                        <DraggableStop
                                            key={index}
                                            index={index}
                                            stop={stop}
                                            onColorChange={(color) => handleColorChange(index, color)}
                                            onRemove={() => handleRemoveStop(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 mb-8 bg-base-100 border border-base-300 p-2 rounded-sm h-full">
                                <div className="flex gap-4 w-full">
                                    <div className="flex items-center gap-2 w-full">
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

                                <div className="relative mb-8 p-2 bg-lines border border-base-300 rounded-sm overflow-hidden">
                                    <div
                                        className="preview-container w-full h-full rounded-sm"
                                        style={{
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
                                    <div className="absolute inset-0 p-4 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                        <div className="flex flex-col gap-2">
                                            <pre className="text-center text-sm text-muted-foreground p-4 max-w-[65ch] text-pretty max-h-55 overflow-y-auto scrollbar-thin">
                                                {`background: ${generateCSS().replace(/((?:[^,]+, ){2})/g, '$1\n')}`}
                                            </pre>
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
            </div>
        </DndProvider>
    );
}
