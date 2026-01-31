'use client';
import React, { useState } from 'react';
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    FloatingFocusManager,
    FloatingPortal,
} from '@floating-ui/react';
import styles from './DestinationDropdown.module.css';

interface DestinationOption {
    value: string;
    label: string;
    emoji: string;
}

interface DestinationDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: DestinationOption[];
    placeholder?: string;
}

export function DestinationDropdown({
    value,
    onChange,
    options,
    placeholder = 'Seleccionar Destino'
}: DestinationDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-start',
        middleware: [
            offset(8),
            flip({ fallbackPlacements: ['top-start'] }),
            shift({ padding: 8 })
        ],
        whileElementsMounted: autoUpdate,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role,
    ]);

    const selectedOption = options.find(opt => opt.value === value);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <>
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className={styles.trigger}
                type="button"
            >
                <span className={styles.triggerText}>
                    {selectedOption ? `${selectedOption.emoji} ${selectedOption.label}` : placeholder}
                </span>
                <svg
                    className={`${styles.triggerIcon} ${isOpen ? styles.triggerIconOpen : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>

            {isOpen && (
                <FloatingPortal>
                    <FloatingFocusManager context={context} modal={false}>
                        <div
                            ref={refs.setFloating}
                            style={floatingStyles}
                            {...getFloatingProps()}
                            className={styles.dropdown}
                        >
                            <div className={styles.dropdownContent}>
                                {options.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className={`${styles.option} ${value === option.value ? styles.optionSelected : ''}`}
                                        type="button"
                                    >
                                        <span className={styles.optionEmoji}>{option.emoji}</span>
                                        <span className={styles.optionLabel}>{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </FloatingFocusManager>
                </FloatingPortal>
            )}
        </>
    );
}
