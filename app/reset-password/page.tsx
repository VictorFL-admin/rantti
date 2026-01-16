"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HeroClient from "@/components/HeroClient";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  return <HeroClient resetPasswordToken={token ?? undefined} resetPasswordEmail={email ?? undefined} />;
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
