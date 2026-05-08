"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onLogin() {
    setLoading(true);
    setError(null);

    const supabase = createBrowserSupabaseClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (signInError) {
      setError("Credenciales incorrectas. Revisa email y contraseña.");
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm items-center px-4">
      <div className="w-full space-y-3 rounded-2xl border border-border bg-card p-5">
        <h1 className="text-xl font-semibold">Acceso privado</h1>
        <input
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
          type="password"
          placeholder="Tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin} disabled={loading || !email || !password} className="w-full">
          {loading ? "Entrando..." : "Entrar"}
        </Button>
        {error ? <p className="text-xs text-red-500">{error}</p> : null}
      </div>
    </main>
  );
}
