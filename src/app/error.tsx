'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-100 mb-4">
          Algo salió mal 🤡
        </h2>
        <p className="text-zinc-400 mb-6">
          AIdelBienestar se confundió y no pudo cargar la página correctamente.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-zinc-700 text-zinc-100 rounded-lg hover:bg-zinc-600 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
} 