import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

const Header = ({
    title = "CyberSecTCP/IP",
    subtitle = "Full Spectrum Network Threats",
    titleColor = "primary", // 'primary' or 'secondary'
    links = []
}) => {

    // Determinar color del span del título
    const colorMap = {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)'
    };
    const titleSpanColor = colorMap[titleColor] || 'var(--color-primary)';

    return (
        <nav
            className="sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 w-full"
            style={{
                backgroundColor: 'var(--bg-primary)',
                opacity: 0.95,
                borderBottom: '1px solid var(--text-tertiary)'
            }}
        >
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col xl:flex-row justify-between items-center py-3">

                    {/* Site Title with Logo */}
                    <div className="flex items-center gap-3 mb-3 xl:mb-0">
                        <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="IsaBosDev Logo" className="w-8 h-8" />
                        <Link to="/" className="no-underline">
                            <div>
                                <h1 className="text-lg font-bold tracking-tight leading-none" style={{ color: 'var(--text-primary)' }}>
                                    IsaBosDev <span style={{ color: titleSpanColor }}> {title}</span>
                                </h1>
                                <p className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
                            </div>
                        </Link>
                    </div>

                    {/* Main Navigation and Tools Wrapper */}
                    <div className="flex items-center w-full xl:w-auto gap-2">
                        {/* Scrollable Navigation Links */}
                        <div className="flex-1 xl:flex-none overflow-x-auto overflow-y-visible no-scrollbar">
                            <div className="flex space-x-6 min-w-max px-2">
                                {links.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        end={link.end}
                                        className={({ isActive }) => `nav-item py-3 text-xs font-bold uppercase tracking-wider ${isActive ? 'active' : ''}`}
                                        style={{
                                            '--nav-active-color': titleSpanColor
                                        }}
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        {/* External Tool Link - Fixed Position relative to nav */}
                        <div className="flex-none flex items-center pl-2 border-l border-(--text-tertiary)">
                            <Tooltip
                                borderColor={titleSpanColor}
                                content={
                                    <div className="text-left">
                                        <div className="text-xs font-semibold">Linux Tools</div>
                                        <div className="text-[10px] opacity-80">Abrir aplicación</div>
                                    </div>
                                }
                            >
                                <a
                                    href="https://isabosdev.com/linux-tools/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center p-2 rounded-md hover:bg-(--bg-secondary) transition-colors"
                                >
                                    <Terminal className="w-5 h-5 transition-transform group-hover:scale-110" style={{ color: titleSpanColor }} />
                                </a>
                            </Tooltip>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Header;
