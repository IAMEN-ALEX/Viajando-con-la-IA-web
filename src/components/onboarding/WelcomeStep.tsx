import Image from "next/image";
import StarBorder from '@/components/StarBorder';

interface WelcomeStepProps {
    onComplete: () => void;
    onNext: () => void;
}

export const WelcomeStep = ({ onComplete, onNext }: WelcomeStepProps) => (
    <>
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-md">Instrucciones para utilizar tu Panel de Viajes</h2>
        <div className="flex justify-start md:justify-center gap-6 mb-8 overflow-x-auto py-2 px-4 scrollbar-hide">
            {/* Image 1 */}
            <div className="flex-1 min-w-[400px] relative group">
                <div className="relative rounded-xl border border-white/10 max-w-6xl bg-black/50 shadow-2xl overflow-hidden">
                    <div className="bg-white/10 border-b border-white/5 px-4 py-2 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <Image
                        src="/dashboard-viajes.png"
                        alt="Dashboard Viajes + IA"
                        width={1100}
                        height={800}
                        className="block"
                        priority
                        quality={95}
                        sizes="(max-width: 768px) 100vw, 80vw"
                    />
                </div>
            </div>

            {/* Image 2 */}
            <div className="flex-1 min-w-[400px] relative group">
                <div className="relative rounded-xl border border-white/10 bg-black/50 shadow-2xl overflow-hidden">
                    <div className="bg-white/10 border-b border-white/5 px-4 py-2 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <Image
                        src="/dashboard-viajes-2.png"
                        alt="Respuesta IA"
                        width={1100}
                        height={800}
                        className="block"
                        priority
                        quality={95}
                        sizes="(max-width: 768px) 100vw, 80vw"
                    />
                </div>
            </div>
        </div>
        <div className="flex justify-between items-center mt-8 px-2">
            <StarBorder
                as="button"
                className="text-white hover:bg-white/10 transition-all font-medium"
                color="cyan"
                speed="5s"
                onClick={onComplete}
            >
                Saltar intro
            </StarBorder>
            <span className="text-white/90 font-medium text-center max-w-xl text-sm md:text-base px-4 drop-shadow-sm">
                Elige tu destino y fecha, agrega las actividades que más disfrutes y deja que la IA cree el itinerario perfecto para ti.
            </span>
            <StarBorder
                as="button"
                className="text-white hover:bg-white/10 transition-all font-bold"
                color="cyan"
                speed="5s"
                onClick={onNext}
            >
                Siguiente
            </StarBorder>
        </div>
    </>
);
