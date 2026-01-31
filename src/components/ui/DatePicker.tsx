'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/Calendar';
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useDismiss,
    useRole,
    useClick,
    useInteractions,
    FloatingFocusManager
} from '@floating-ui/react';

interface DatePickerProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    placeholder?: string;
    className?: string;
}

export function DatePicker({ date, setDate, placeholder = "Pick a date", className }: DatePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(10), flip(), shift()],
        whileElementsMounted: autoUpdate,
        placement: 'bottom-start'
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role
    ]);

    return (
        <div className={cn("relative", className)}>
            <button
                ref={refs.setReference}
                type="button"
                {...getReferenceProps()}
                className={cn(
                    "w-full flex h-10 w-full rounded-md border border-white/10 bg-white/5 py-2 px-3 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 text-left items-center",
                    !date && "text-gray-400"
                )}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>{placeholder}</span>}
            </button>

            {isOpen && (
                <FloatingFocusManager context={context} modal={false}>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                        className="z-50 rounded-md border border-white/10 bg-black/90 text-white shadow-xl backdrop-blur-xl p-0"
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(d) => {
                                setDate(d);
                                setIsOpen(false);
                            }}
                            initialFocus
                        />
                    </div>
                </FloatingFocusManager>
            )}
        </div>
    );
}
