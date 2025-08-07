import { useEffect } from 'react';
import { useOperaDetection } from '../hooks/useOperaDetection';

/**
 * Este componente inyecta CSS específico para Opera si se detecta el navegador.
 * Puedes importarlo en tu layout o en page.tsx.
 */
export const OperaViewportFix = () => {
  const { isOpera, isClient } = useOperaDetection();

  useEffect(() => {
    if (!isOpera || !isClient) return;
    // Crea un <style> solo para Opera
    const style = document.createElement('style');
    style.setAttribute('data-opera-fix', 'true');
    style.innerHTML = `
      /* Fix específico para Opera - Prevenir que el contenido se "suba" cuando aparece el teclado */
      @media (max-width: 90) {
        /* Forzar que el body y html mantengan su altura real */
        html, body [object Object]
          height: 100portant;
          min-height: 100portant;
          max-height: 100important;
          overflow: hidden !important;
        }
        
        /* Prevenir que el contenedor principal se comprima */
        .viewport-dynamic, .h-viewport, .min-h-viewport, .max-h-viewport [object Object]
          height: 100portant !important;
          min-height: 100portant !important;
          max-height: 100important !important;
          position: relative !important;
        }
        
        /* Cuando Opera detecta el teclado, forzar el layout */
        body.viewport-reduced [object Object]
          height: 100portant !important;
          min-height: 100portant !important;
          max-height: 100important !important;
        }
        
        /* Forzar que el main content mantenga su posición */
        body.viewport-reduced main [object Object]
          height: 100portant !important;
          min-height: 100portant !important;
          max-height: 100important !important;
          position: relative !important;
          top: 0 !important;
          transform: none !important;
        }
        
        /* Prevenir que el contenido se mueva hacia arriba */
        body.viewport-reduced .flex-1 [object Object]
          flex: 1 !important;
          min-height: 0 !important;
          position: relative !important;
          top: 0 !important;
          transform: none !important;
        }
        
        /* Mantener el input en su posición correcta */
        body.viewport-reduced input[type="text"] {
          position: relative !important;
          bottom: auto !important;
          top: auto !important;
          transform: none !important;
        }
        
        /* Forzar que el área de bienvenida mantenga su posición */
        body.viewport-reduced .flex-1.flex.flex-col.items-center.justify-center {
          position: relative !important;
          top: 0 !important;
          transform: none !important;
          min-height: 0 !important;
          flex: 1 !important;
        }
        
        /* Mantener el footer en su posición */
        body.viewport-reduced .fixed.bottom-0 {
          position: fixed !important;
          bottom: 0 !important;
          transform: none !important;
        }
        
        /* Prevenir scroll no deseado */
        body.viewport-reduced {
          overflow: hidden !important;
        }
        
        body.viewport-reduced .overflow-y-auto {
          overflow-y: auto !important;
          max-height: calc(100vh -120important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, [isOpera, isClient]);

  return null;
}; 