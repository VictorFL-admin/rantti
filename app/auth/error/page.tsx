"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>("Error al autenticar. Intenta nuevamente.");

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setErrorMessage(decodeURIComponent(message));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100">
      <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Error de autenticación
        </h1>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-colors"
          >
            Volver al inicio
          </button>
          <button
            onClick={() => router.back()}
            className="bg-[#0047FF] hover:bg-[#0039CC] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#0047FF] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
