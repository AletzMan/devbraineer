import HeaderSection from '../../componentes/HeaderSection';
import EncoderDecoder from './components/EncoderDecoder';

export default function EncoderDecoderPage() {
    return (
        <div className="flex min-h-screen bg-neutral/50">
            <div className="flex flex-col gap-2 w-full flex-1 max-w-(--max-width) mx-auto h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
                <HeaderSection
                    title="Codificador/Decodificador"
                    description="Convierte texto entre diferentes formatos de codificación">
                    <label className="label flex flex-col justify-start items-start">
                        <span className="label-text text-lg">Codifica o decodifica texto</span>
                        <span className="label-text text-sm text-muted-foreground">
                            Soporta Base64, Hexadecimal, URL Encode, Unicode, ROT13 y Código Morse
                        </span>
                    </label>
                </HeaderSection>
                <EncoderDecoder />
            </div>
        </div>
    );
}
