import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente ScrollToTop - Restablece la posición de desplazamiento al inicio cuando cambia la ruta
 * Coloca este componente dentro del Router pero fuera de Routes
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
