import { useEffect, useState, useCallback, useRef } from 'react';

interface ViewportState {
  height: number;
  width: number;
  initialHeight: number;
  isKeyboardOpen: boolean;
  scaleFactor: number;
}

export const useViewport = () => {
  const [isClient, setIsClient] = useState(false);
  const initialHeightRef = useRef<number | null>(null);
  const [viewportState, setViewportState] = useState<ViewportState>({
    height: 1000,
    width: 1000,
    initialHeight: 1000,
    isKeyboardOpen: false,
    scaleFactor: 1,
  });

  const updateViewportVariables = useCallback(() => {
    if (typeof window === 'undefined' || !isClient) return;

    const visualViewport = window.visualViewport;
    const viewportHeight = visualViewport ? visualViewport.height : window.innerHeight;
    const viewportWidth = visualViewport ? visualViewport.width : window.innerWidth;
    // Solo tomar el initialHeight una vez, y debe ser el primer viewportHeight real
    if (initialHeightRef.current === null) {
      initialHeightRef.current = viewportHeight;
    }
    const initialHeight = initialHeightRef.current;
    const isKeyboardOpen = viewportHeight < initialHeight * 0.8;
    const scaleFactor = viewportHeight / initialHeight;

    // Actualizar variables CSS
    document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);
    document.documentElement.style.setProperty('--viewport-width', `${viewportWidth}px`);
    document.documentElement.style.setProperty('--initial-viewport-height', `${initialHeight}px`);
    document.documentElement.style.setProperty('--is-keyboard-open', isKeyboardOpen ? '1' : '0');
    document.documentElement.style.setProperty('--scale-factor', scaleFactor.toString());

    // Actualizar altura del body
    document.body.style.height = `${viewportHeight}px`;
    document.body.style.minHeight = `${viewportHeight}px`;
    document.body.style.maxHeight = `${viewportHeight}px`;

    // Añadir/remover clase para estado del teclado
    if (isKeyboardOpen) {
      document.body.classList.add('viewport-reduced');
      document.documentElement.classList.add('viewport-reduced');
    } else {
      document.body.classList.remove('viewport-reduced');
      document.documentElement.classList.remove('viewport-reduced');
    }

    // Actualizar estado del hook
    setViewportState({
      height: viewportHeight,
      width: viewportWidth,
      initialHeight,
      isKeyboardOpen,
      scaleFactor,
    });
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !isClient) return;

    // Función debounced para evitar múltiples actualizaciones
    let resizeTimeout: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(updateViewportVariables);
      }, 10);
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
    updateViewportVariables();

    // Cleanup
    return () => {
      clearTimeout(resizeTimeout);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', debouncedUpdate);
        window.visualViewport.removeEventListener('scroll', debouncedUpdate);
      } else {
        window.removeEventListener('resize', debouncedUpdate);
        window.removeEventListener('orientationchange', debouncedUpdate);
      }
    };
  }, [updateViewportVariables, isClient]);

  return viewportState;
}; 