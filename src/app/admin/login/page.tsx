"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="font-display text-2xl text-indigo-950 mb-1">Zira<span className="text-indigo-600">.</span>AI</div>
          <p className="text-gray-500 text-sm font-light">Admin access</p>
        </div>
        <div className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button onClick={handleLogin} disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
