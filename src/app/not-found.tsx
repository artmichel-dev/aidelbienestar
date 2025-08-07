import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-100 mb-4">
          Página no encontrada 🤡
        </h2>
        <p className="text-zinc-400 mb-6">
          AIdelBienestar no puede encontrar esta página porque no sabe dónde está.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-zinc-700 text-zinc-100 rounded-lg hover:bg-zinc-600 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
} 