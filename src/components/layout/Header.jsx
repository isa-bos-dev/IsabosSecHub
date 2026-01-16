import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// Se han eliminado importaciones no utilizadas de 'lucide-react' para limpieza

const Header = ({
    title = "CyberSecTCP/IP",
    subtitle = "Full Spectrum Network Threats",
    titleColor = "primary", // 'primary' or 'secondary'
    links = []
}) => {

    // Determinar color del span del título
    const titleSpanColor = titleColor === 'secondary' ? 'var(--color-secondary)' : 'var(--color-primary)';

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

                    {/* Main Navigation Tabs */}
                    <div className="w-full xl:w-auto overflow-x-auto overflow-y-hidden no-scrollbar">
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

                </div>
            </div>
        </nav>
    );
};

export default Header;
