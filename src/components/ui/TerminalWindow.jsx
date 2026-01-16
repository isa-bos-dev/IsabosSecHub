import React from 'react';
import { Terminal } from 'lucide-react';

const TerminalWindow = ({ title, children, className = "" }) => {
    return (
        <div
            className={`rounded-xl border border-(--text-tertiary) shadow-inner overflow-hidden group bg-(--bg-code) text-sm ${className}`}
            style={{ fontFamily: 'var(--font-mono)' }}
        >
            <div className="flex items-center justify-between px-4 py-2 bg-(--bg-primary)/50 border-b border-(--text-tertiary)">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                {title && (
                    <span className="text-xs text-(--text-secondary) font-medium uppercase tracking-wider">
                        {title}
                    </span>
                )}
            </div>

            <div className="p-6 relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-(--text-tertiary)">
                    <Terminal size={100} />
                </div>
                <div className="relative z-10 space-y-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const TerminalLine = ({ children, type = 'output' }) => {
    if (type === 'command') {
        const text = children.toString();
        const promptIndex = text.indexOf('$');
        const hasPrompt = text.includes('root@') && promptIndex !== -1;

        if (hasPrompt) {
            const prompt = text.substring(0, promptIndex + 1);
            const cmd = text.substring(promptIndex + 1);
            return (
                <div className="mb-2">
                    <span style={{ color: 'var(--color-success)' }}>{prompt}</span>
                    <span className="text-(--text-primary)">{cmd}</span>
                </div>
            );
        }
        return <div className="text-(--text-primary) mb-2">$ {children}</div>;
    }

    if (type === 'comment') {
        return (
            <div className="text-(--text-tertiary) italic">
                {children}
            </div>
        );
    }

    // Salida por defecto
    return (
        <div className="text-(--text-primary) whitespace-pre-wrap break-all">
            {children}
        </div>
    );
};

export default TerminalWindow;
