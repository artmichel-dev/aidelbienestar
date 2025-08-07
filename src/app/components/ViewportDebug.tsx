"use client";
import { useViewport } from "../hooks/useViewport";
import { ClientOnly } from "./ClientOnly";

interface ViewportDebugProps {
  enabled?: boolean;
}

export const ViewportDebug = ({ enabled = false }: ViewportDebugProps) => {
  const viewport = useViewport();

  if (!enabled) return null;

  return (
    <ClientOnly>
      <div className="viewport-debug">
        <div>Height: {viewport.height}px</div>
        <div>Width: {viewport.width}px</div>
        <div>Initial: {viewport.initialHeight}px</div>
        <div>Keyboard: {viewport.isKeyboardOpen ? "Open" : "Closed"}</div>
        <div>Scale: {viewport.scaleFactor.toFixed(2)}</div>
      </div>
    </ClientOnly>
  );
}; 