import HeaderSection from '../../componentes/HeaderSection';
import GradientGenerator from './components/GradientGenerator';
import TailwindGradientGenerator from './components/TailwindGradientGenerator';

export default function GradientGeneratorPage() {
    return (
        <div className="flex min-h-screen bg-neutral/50">
            <div className="flex flex-col gap-2 w-full flex-1 max-w-(--max-width) mx-auto h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
                <HeaderSection
                    title="Generador de Gradientes"
                    description="Crea y personaliza hermosos gradientes con múltiples puntos de color">
                    <label className="label flex flex-col justify-start items-start">
                        <span className="label-text text-lg">Genera gradientes profesionales</span>
                        <span className="label-text text-sm text-muted-foreground">
                            Crea gradientes lineales y radiales con múltiples puntos de color
                        </span>
                    </label>
                </HeaderSection>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Generador CSS</h2>
                            <GradientGenerator />
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Generador Tailwind</h2>
                            <TailwindGradientGenerator />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
