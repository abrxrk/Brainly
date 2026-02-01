"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brain, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import Input from "@/components/Input";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-between">
          <BackButton />
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-zinc-900 shadow-sm">
              <Brain size={24} />
            </div>
          </Link>
          <div className="w-5" />
        </div>
        <div className="text-center space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-muted mt-2">
              Sign in to access your knowledge hub
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="surface ring-soft rounded-3xl p-8 space-y-6"
        >
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            showPasswordToggle
            required
          />

          <Button type="submit" loading={loading} className="w-full">
            Sign in
            <ArrowRight size={16} />
          </Button>

          <p className="text-center text-sm text-muted">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-[var(--fg)] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
