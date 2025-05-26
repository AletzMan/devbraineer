import GradientGenerator from './components/GradientGenerator';
import TailwindGradientGenerator from './components/TailwindGradientGenerator';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';

export default function GradientGeneratorPage() {
    return (
        <LayoutSubSection>
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
        </LayoutSubSection>
    );
}
