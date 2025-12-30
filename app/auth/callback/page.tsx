"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const userStr = searchParams.get("user");

    if (token && userStr) {
      try {
        // Guardar token y usuario en localStorage
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user", userStr);

        // Redirigir al dashboard o home
        router.push("/");
      } catch (err) {
        console.error("Error procesando callback:", err);
        setError("Error al procesar la autenticación");
      }
    } else {
      setError("Datos de autenticación incompletos");
    }
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Error de autenticación
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#0047FF] hover:bg-[#0039CC] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100">
      <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-3xl">🔐</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Procesando autenticación...
        </h1>
        <p className="text-gray-600">
          Espera un momento mientras configuramos tu sesión.
        </p>
        <div className="mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047FF] mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0047FF]"></div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
