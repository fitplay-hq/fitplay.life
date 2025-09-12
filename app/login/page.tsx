"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [provider, setProvider] = useState<"users" | "admin">("users");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await signIn(provider, {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (result?.error) {
      setMessage(`❌ ${result.error}`);
    } else {
      setMessage("✅ Logged in successfully!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Test Login</h1>

        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={() => setProvider("users")}
            className={`px-3 py-1 rounded ${provider === "users" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setProvider("admin")}
            className={`px-3 py-1 rounded ${provider === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Admin
          </button>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}
