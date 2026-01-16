import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const ProjectLayout = ({
    title,
    subtitle,
    titleColor,
    links
}) => {
    return (
        <div className="flex flex-col min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

            <Header
                title={title}
                subtitle={subtitle}
                titleColor={titleColor}
                links={links}
            />

            {/* Contenido principal usando Outlet para rutas anidadas */}
            <main className="flex-1 w-full relative flex flex-col">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col h-full" style={{ color: 'var(--text-primary)' }}>
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectLayout;
