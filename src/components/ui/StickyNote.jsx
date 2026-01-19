import React from 'react';
import { Info } from 'lucide-react';

const StickyNote = ({ title = "NOTA IMPORTANTE", children, className = "" }) => {
    return (
        <div className={`relative bg-(--note-bg) text-(--note-text) p-6 rounded-lg shadow-lg rotate-1 border-t-8 border-(--note-border) max-w-2xl mx-auto transform transition-hover hover:rotate-0 hover:scale-[1.01] duration-300 ${className}`}>
            {/* Pin/Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-(--note-tape) backdrop-blur-sm -rotate-2 shadow-sm border border-white/40"></div>

            <div className="flex items-start gap-4">
                <div className="text-(--note-accent) mt-1 shrink-0">
                    <Info size={24} strokeWidth={2.5} />
                </div>
                <div className="w-full">
                    {title && (
                        <div className="font-bold text-(--note-accent) mb-2 uppercase tracking-wide text-sm border-b-2 border-(--note-border)/30 pb-1 inline-block">
                            {title}
                        </div>
                    )}
                    <div className="font-mono text-sm leading-relaxed whitespace-pre-line text-(--note-text)">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickyNote;
