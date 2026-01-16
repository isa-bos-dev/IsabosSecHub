import React from 'react';

const Footer = ({ className = "", style = {} }) => {
    return (
        <footer
            className={`border-t py-4 flex-shrink-0 z-10 text-xs text-center ${className}`}
            style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--text-tertiary)',
                color: 'var(--text-secondary)',
                ...style,
            }}
        >
            <p>
                {new Date().getFullYear()} | Designed by{' '}
                <a href="https://isabosdev.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors ml-1 font-mono">
                    <span className="text-[#569CD6] font-bold">;</span>sa
                    <span className="text-[#9CDCFE] font-bold">{'}'}</span>os
                    <span className="text-[#CE9178] font-bold">/&gt;</span>ev
                </a>
            </p>
        </footer>
    );
};

export default Footer;
