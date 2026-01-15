"use client";

import Dashboard from "@/components/Dashboard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { logout, getStoredUser, isAuthenticated } from "@/lib/auth";

export default function ConfiguracionPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string; avatar?: string } | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      const storedUser = getStoredUser();
      if (storedUser) {
        setUser({
          name: storedUser.name,
          email: storedUser.email,
          avatar: "",
        });
      }
    } else {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleNavigate = (page: 'home') => {
    router.push('/');
  };

  const handleUpdateUser = (updates: { name?: string; avatar?: string }) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0047FF]"></div>
      </div>
    );
  }

  return (
    <Dashboard 
      user={user}
      onLogout={handleLogout}
      onNavigate={handleNavigate}
      onUpdateUser={handleUpdateUser}
    />
  );
}
