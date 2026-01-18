import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const InfografiaViewer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Obtener la imagen y título del estado de navegación o usar defaults
    const { imageSrc, title, description } = location.state || {};

    if (!imageSrc) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                <h2 className="text-2xl font-bold text-error mb-4">No se especificó ninguna infografía</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                >
                    Volver
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-(--bg-primary) flex flex-col animate-fade-in h-screen w-screen overflow-hidden">
            {/* Header de la Toolbar */}
            <div className="bg-(--bg-secondary) border-b border-(--text-tertiary)/30 p-4 flex justify-between items-center shadow-md z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-(--bg-tertiary) rounded-full text-(--text-primary) transition-colors cursor-pointer"
                        title="Volver"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-(--text-primary)">{title}</h1>
                        {description && <p className="text-xs text-(--text-secondary)">{description}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href={imageSrc}
                        download
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-bold transition-colors mr-4"
                    >
                        <Download size={18} /> Descargar
                    </a>
                </div>
            </div>

            {/* Visor con Zoom */}
            <div className="flex-1 overflow-hidden bg-(--bg-primary) relative flex items-center justify-center p-4">
                <TransformWrapper
                    initialScale={0.9}
                    minScale={0.5}
                    maxScale={4}
                    centerOnInit={true}
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-(--bg-secondary)/80 backdrop-blur p-2 rounded-lg border border-(--text-tertiary)/30 shadow-xl">
                                <button onClick={() => zoomIn()} className="p-2 hover:bg-primary/20 hover:text-primary rounded text-(--text-primary)" title="Zoom In"><ZoomIn size={20} /></button>
                                <button onClick={() => zoomOut()} className="p-2 hover:bg-primary/20 hover:text-primary rounded text-(--text-primary)" title="Zoom Out"><ZoomOut size={20} /></button>
                                <button onClick={() => resetTransform()} className="text-xs font-mono p-1 text-(--text-secondary) hover:text-primary text-center mt-1">100%</button>
                            </div>

                            <TransformComponent
                                wrapperStyle={{ width: "100%", height: "100%" }}
                                contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                <img
                                    src={imageSrc}
                                    alt={title}
                                    style={{ maxWidth: "100%", maxHeight: "calc(100vh - 120px)", objectFit: "contain" }}
                                    className="shadow-2xl"
                                />
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>
        </div>
    );
};

export default InfografiaViewer;
