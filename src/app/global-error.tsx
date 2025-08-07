'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-zinc-900 text-zinc-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Error Crítico 🤡
            </h2>
            <p className="text-zinc-400 mb-6">
              AIdelBienestar tuvo un error muy grave y no puede funcionar.
            </p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-zinc-700 text-zinc-100 rounded-lg hover:bg-zinc-600 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </body>
    </html>
  );
} 