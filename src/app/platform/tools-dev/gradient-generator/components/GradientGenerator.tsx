'use client';
import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { Sparkles, Eye, Code, Download, RotateCcw, RotateCw, Trash2 } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface GradientStop {
    color: string;
    position: number;
}

export default function GradientGenerator() {
    const [gradientStops, setGradientStops] = useState<GradientStop[]>([
        { color: '#FF0000', position: 0 },
        { color: '#00FF00', position: 1 },
    ]);
    const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
    const [direction, setDirection] = useState('to right');
    const [previewSize, setPreviewSize] = useState(300);
    const [copied, setCopied] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [centerX, setCenterX] = useState(50);
    const [centerY, setCenterY] = useState(50);

    const handleAddStop = () => {
        const newStop: GradientStop = {
            color: chroma.random().hex(),
            position: Math.random(),
        };
        setGradientStops([...gradientStops, newStop].sort((a, b) => a.position - b.position));
    };

    const handleRemoveStop = (index: number) => {
        const newStops = [...gradientStops];
        newStops.splice(index, 1);
        setGradientStops(newStops);
    };

    const handleColorChange = (index: number, color: string) => {
        const newStops = [...gradientStops];
        newStops[index].color = color;
        setGradientStops(newStops);
    };

    const handlePositionChange = (index: number, position: number) => {
        const newStops = [...gradientStops];
        newStops[index].position = position;
        setGradientStops(newStops.sort((a, b) => a.position - b.position));
    };

    const DraggableStop = ({
        index,
        stop,
        onColorChange,
        onPositionChange,
        onRemove,
    }: {
        index: number;
        stop: GradientStop;
        onColorChange: (color: string) => void;
        onPositionChange: (position: number) => void;
        onRemove: () => void;
    }) => {
        const [{ isDragging }, drag] = useDrag({
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
                    drag(drop(node));
                }}
                className="flex items-center space-x-4 border-2 border-dashed rounded-lg p-2 transition-all duration-200"
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                    backgroundColor: isDragging ? '#f3f4f6' : 'transparent',
                }}>
                <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="w-12 h-12"
                />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={stop.position}
                    onChange={(e) => onPositionChange(parseFloat(e.target.value))}
                    className="flex-1"
                />
                <button onClick={onRemove} className="btn btn-error btn-sm">
                    Eliminar
                </button>
            </div>
        );
    };

    const handleRotate = (degrees: number) => {
        setRotation((prev) => (prev + degrees) % 360);
    };

    const handleReset = () => {
        setGradientStops([
            { color: '#FF0000', position: 0 },
            { color: '#00FF00', position: 1 },
        ]);
        setDirection('to right');
        setPreviewSize(300);
        setRotation(0);
        setCenterX(50);
        setCenterY(50);
    };

    const generateCSS = () => {
        const stops = gradientStops.map((stop) => `${stop.color} ${stop.position * 100}%`).join(', ');

        if (gradientType === 'linear') {
            return `linear-gradient(${direction}, ${stops})`;
        }

        // Para gradientes radiales, calculamos la posición del centro y aplicamos la rotación
        const angle = (rotation * Math.PI) / 180; // Convertir a radianes

        // Calcular el desplazamiento basado en la rotación
        const displacement = 10; // Desplazamiento máximo
        const offsetX = Math.cos(angle) * displacement;
        const offsetY = Math.sin(angle) * displacement;

        // Calcular nuevas coordenadas
        const newX = centerX + offsetX;
        const newY = centerY + offsetY;

        // Asegurarnos que las coordenadas estén dentro del rango 0-100
        const finalX = Math.max(0, Math.min(100, newX));
        const finalY = Math.max(0, Math.min(100, newY));

        return `radial-gradient(circle at ${finalX.toFixed(2)}% ${finalY.toFixed(2)}%, ${stops})`;
    };

    const generatePreviewStyle = () => {
        return {
            background: generateCSS(),
            transition: 'background 0.3s ease',
            width: `${previewSize}px`,
            height: `${previewSize}px`,
            padding: '1rem',
            borderRadius: '0.5rem',
        };
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCSS());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold">Generador de Gradientes</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Crea y personaliza hermosos gradientes con múltiples puntos de color
                    </p>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center gap-4 mb-6">
                            <Eye className="h-5 w-5 text-muted-foreground" />
                            <h3 className="font-semibold">Vista Previa</h3>
                        </div>

                        <div className="space-y-4 mb-8">
                            {gradientStops.map((stop, index) => (
                                <DraggableStop
                                    key={index}
                                    index={index}
                                    stop={stop}
                                    onColorChange={(color) => handleColorChange(index, color)}
                                    onPositionChange={(position) => handlePositionChange(index, position)}
                                    onRemove={() => handleRemoveStop(index)}
                                />
                            ))}
                            <button onClick={handleAddStop} className="btn btn-primary btn-sm">
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
                                    <option value="to right">Izquierda a Derecha</option>
                                    <option value="to left">Derecha a Izquierda</option>
                                    <option value="to top">Abajo a Arriba</option>
                                    <option value="to bottom">Arriba a Abajo</option>
                                    <option value="to top right">Diagonal (Arriba Derecha)</option>
                                    <option value="to top left">Diagonal (Arriba Izquierda)</option>
                                    <option value="to bottom right">Diagonal (Abajo Derecha)</option>
                                    <option value="to bottom left">Diagonal (Abajo Izquierda)</option>
                                </select>
                            )}
                            {gradientType === 'radial' && (
                                <>
                                    <button onClick={() => handleRotate(90)} className="btn btn-outline btn-sm">
                                        <RotateCw className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleRotate(-90)} className="btn btn-outline btn-sm">
                                        <RotateCcw className="h-4 w-4" />
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-4">
                                <label className="label">
                                    <span className="label-text">Tamaño de Vista Previa</span>
                                    <input
                                        type="range"
                                        min="100"
                                        max="500"
                                        value={previewSize}
                                        onChange={(e) => setPreviewSize(parseInt(e.target.value))}
                                        className="range"
                                    />
                                    <span className="text-sm text-muted-foreground">{previewSize}px</span>
                                </label>
                            </div>
                        </div>

                        {gradientType === 'radial' && (
                            <div className="mb-8">
                                <label className="label">
                                    <span className="label-text">Centro del gradiente</span>
                                    <div className="flex gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={centerX}
                                            onChange={(e) => setCenterX(parseInt(e.target.value))}
                                            className="range"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={centerY}
                                            onChange={(e) => setCenterY(parseInt(e.target.value))}
                                            className="range"
                                        />
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {centerX}% x {centerY}%
                                    </span>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="mb-8">
                        <div className="preview-container" style={generatePreviewStyle()} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <pre className="p-4 bg-base-200 rounded-lg">{`background: ${generateCSS()};`}</pre>
                        <div className="flex gap-2">
                            <button onClick={handleCopy} className="btn btn-secondary btn-sm flex-1">
                                {copied ? 'Copiado!' : 'Copiar CSS'}
                            </button>
                            <button onClick={handleReset} className="btn btn-ghost btn-sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Resetear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
}
