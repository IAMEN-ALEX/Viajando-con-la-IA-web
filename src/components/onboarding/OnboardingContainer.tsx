import { useState } from "react";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { WelcomeStep } from './WelcomeStep';
import { InstructionStep } from './InstructionStep';
import { FinalStep } from './FinalStep';

// Dynamically import heavy WebGL component with extensive preloading
const Iridescence = dynamic(() => import('@/components/Iridescence'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-transparent" />
});

interface OnboardingProps {
    onComplete: () => void;
}

const CONNECTION_COLOR = [0.3, 0.7, 0.4];

export default function OnboardingContainer({ onComplete }: OnboardingProps) {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((prev) => prev + 1);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 flex items-center justify-center z-50"
        >
            <Iridescence
                color={CONNECTION_COLOR}
                mouseReact={true}
                amplitude={0.1}
                speed={1}
                className="absolute inset-0 w-full h-full -z-10"
            />
            {/* Preload images for instant transition */}


            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                className="max-w-[95vw] w-full mx-4 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative"
            >
                {step === 0 && <WelcomeStep onComplete={onComplete} onNext={nextStep} />}
                {step === 1 && <InstructionStep onNext={() => setStep(2)} />}
                {step === 2 && <FinalStep onComplete={onComplete} />}
            </motion.div>
        </motion.div>
    );
}
