interface FinalStepProps {
    onComplete: () => void;
}

export const FinalStep = ({ onComplete }: FinalStepProps) => (
    <div className="text-center py-8">
        <div className="text-6xl mb-6 animate-bounce">🌍</div>
        <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-md">¡Listo para viajar con IA!</h2>
        <button
            onClick={onComplete}
            className="bg-green-600/90 hover:bg-green-600 text-white px-10 py-3 rounded-xl transition-all shadow-lg hover:shadow-green-500/30 font-bold text-xl transform hover:scale-105 backdrop-blur-sm"
        >
            Ir al Dashboard
        </button>
    </div>
);
