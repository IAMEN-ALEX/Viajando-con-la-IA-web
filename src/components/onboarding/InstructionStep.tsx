interface InstructionStepProps {
    onNext: () => void;
}

export const InstructionStep = ({ onNext }: InstructionStepProps) => (
    <>
        <h2 className="text-2xl font-bold text-center mb-6 text-white drop-shadow-md">¿Cómo usar tu App Viajando con la IA?</h2>
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10 shadow-inner">
            <ul className="space-y-4 text-gray-100 font-medium">
                <li className="flex items-center gap-3">
                    <span className="text-2xl">🔍</span> Elige tu destino y fechas.
                </li>
                <li className="flex items-center gap-3">
                    <span className="text-2xl">📝</span> Agrega notas personalizadas.
                </li>
                <li className="flex items-center gap-3">
                    <span className="text-2xl">🧠</span> Deja que la IA sugiera actividades.
                </li>
                <li className="flex items-center gap-3">
                    <span className="text-2xl">📌</span> Guarda y edita tu itinerario.
                </li>
            </ul>
        </div>
        <button
            onClick={onNext}
            className="w-full bg-blue-600/90 hover:bg-blue-600 text-white py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 font-bold text-lg backdrop-blur-sm"
        >
            ¡Entendido!
        </button>
    </>
);
