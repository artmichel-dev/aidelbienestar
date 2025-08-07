import { useEffect, useRef } from 'react';
import { useOperaDetection } from '../hooks/useOperaDetection';

/**
 * Fix específico para Opera usando JavaScript para ajustar el viewport dinámicamente
 * cuando aparece el teclado virtual. Ajusta solo el contenedor principal.
 */
export const OperaViewportJSFix = () => {
  const { isOpera, isClient } = useOperaDetection();
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const originalHeightRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpera || !isClient || typeof window === 'undefined') return;

    const updateViewportHeight = () => {
      const currentHeight = window.innerHeight;
      // Guardar la altura original solo una vez
      if (originalHeightRef.current === null) {
        originalHeightRef.current = currentHeight;
      }
      // Detectar si el teclado está abierto (viewport reducido)
      const isKeyboardOpen = currentHeight < (originalHeightRef.current * 0.8);
      const viewportElements = document.querySelectorAll('.viewport-dynamic');
      if (isKeyboardOpen) {
        viewportElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            element.style.height = `${currentHeight}px`;
            element.style.minHeight = `${currentHeight}px`;
            element.style.maxHeight = `${currentHeight}px`;
            element.style.overflow = 'auto';
          }
        });
        // Scroll automático al input si existe
        const input = document.querySelector('input[type="text"]');
        if (input instanceof HTMLElement) {
          setTimeout(() => {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      } else {
        viewportElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            element.style.height = '';
            element.style.minHeight = '';
            element.style.maxHeight = '';
            element.style.overflow = '';
          }
        });
      }
    };

    // Función debounced para evitar múltiples actualizaciones
    const debouncedUpdate = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        requestAnimationFrame(updateViewportHeight);
      }, 50);
    };

    // Configurar listeners
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', debouncedUpdate);
      window.visualViewport.addEventListener('scroll', debouncedUpdate);
    } else {
      window.addEventListener('resize', debouncedUpdate);
      window.addEventListener('orientationchange', () => {
        setTimeout(debouncedUpdate, 100);
      });
    }

    // Inicialización inmediata
    updateViewportHeight();

    // Cleanup
    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      // Restaurar todo al desmontar
      const viewportElements = document.querySelectorAll('.viewport-dynamic');
      viewportElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.height = '';
          element.style.minHeight = '';
          element.style.maxHeight = '';
          element.style.overflow = '';
        }
      });
    };
  }, [isOpera, isClient]);

  return null;
}; 