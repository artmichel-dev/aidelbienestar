"use client";
import { useEffect } from "react";

export const ViewportInitializer = () => {
  useEffect(() => {
    // Función para inicializar el sistema de viewport dinámico
    const initViewport = () => {
      // Guardar initialHeight solo una vez
      let initialHeight: number | null = null;
      // Variables CSS globales para viewport dinámico
      const setViewportVariables = () => {
        const visualViewport = window.visualViewport;
        const viewportHeight = visualViewport ? visualViewport.height : window.innerHeight;
        const viewportWidth = visualViewport ? visualViewport.width : window.innerWidth;
        // Solo guardar una vez, y debe ser el primer viewportHeight real
        if (initialHeight === null) {
          initialHeight = viewportHeight;
        }
        const isKeyboardOpen = viewportHeight < initialHeight * 0.8;
        const scaleFactor = viewportHeight / initialHeight;
        document.documentElement.style.setProperty('--viewport-height', viewportHeight + 'px');
        document.documentElement.style.setProperty('--viewport-width', viewportWidth + 'px');
        document.documentElement.style.setProperty('--initial-viewport-height', initialHeight + 'px');
        document.documentElement.style.setProperty('--is-keyboard-open', isKeyboardOpen ? '1' : '0');
        document.documentElement.style.setProperty('--scale-factor', scaleFactor.toString());
        // Actualizar altura del body
        document.body.style.height = viewportHeight + 'px';
        document.body.style.minHeight = viewportHeight + 'px';
        document.body.style.maxHeight = viewportHeight + 'px';
        // Añadir/remover clase para estado del teclado
        if (isKeyboardOpen) {
          document.body.classList.add('viewport-reduced');
          document.documentElement.classList.add('viewport-reduced');
        } else {
          document.body.classList.remove('viewport-reduced');
          document.documentElement.classList.remove('viewport-reduced');
        }
      };
      // Función debounced para evitar múltiples actualizaciones
      let resizeTimeout: ReturnType<typeof setTimeout>;
      const debouncedSetViewport = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          requestAnimationFrame(setViewportVariables);
        }, 10);
      };
      // Configurar listeners
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', debouncedSetViewport);
        window.visualViewport.addEventListener('scroll', debouncedSetViewport);
      } else {
        window.addEventListener('resize', debouncedSetViewport);
        window.addEventListener('orientationchange', () => {
          setTimeout(debouncedSetViewport, 100);
        });
      }
      // Inicialización inmediata
      setViewportVariables();
      // Re-inicializar después de que la página esté completamente cargada
      window.addEventListener('load', setViewportVariables);
      // Cleanup function
      return () => {
        clearTimeout(resizeTimeout);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', debouncedSetViewport);
          window.visualViewport.removeEventListener('scroll', debouncedSetViewport);
        } else {
          window.removeEventListener('resize', debouncedSetViewport);
          window.removeEventListener('orientationchange', debouncedSetViewport);
        }
      };
    };
    // Inicializar después de un pequeño delay para asegurar que React ha terminado la hidratación
    const timeoutId = setTimeout(initViewport, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  // Este componente no renderiza nada visible
  return null;
}; 