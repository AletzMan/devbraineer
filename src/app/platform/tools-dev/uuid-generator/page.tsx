import HeaderSection from '../../componentes/HeaderSection';
import UUIDGenerator from './components/UUIDGenerator';

export default function UUIDGeneratorPage() {
    return (
        <div className="flex min-h-screen bg-neutral/50">
            <div className="flex flex-col gap-2 w-full flex-1 max-w-(--max-width) mx-auto h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
                <HeaderSection
                    title="Generador de UUIDs"
                    description="Crea identificadores únicos para tus proyectos">
                    <label className="label flex flex-col justify-start items-start">
                        <span className="label-text text-lg">Genera UUIDs v4</span>
                        <span className="label-text text-sm text-muted-foreground">
                            Crea identificadores únicos y seguros para tus aplicaciones
                        </span>
                    </label>
                </HeaderSection>
                <UUIDGenerator />
            </div>
        </div>
    );
}
