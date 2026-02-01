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

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length !== 8) {
      toast.error("Password must be exactly 8 characters");
      return;
    }

    setLoading(true);
    try {
      await signup(formData);
      toast.success("Account created! Please sign in.");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Failed to create account. Email may already be in use.");
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
            <h1 className="text-2xl font-semibold">Create your account</h1>
            <p className="text-sm text-muted mt-2">
              Start building your knowledge hub today
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="surface ring-soft rounded-3xl p-8 space-y-6"
        >
          <Input
            label="Username"
            type="text"
            placeholder="johndoe"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
            minLength={3}
            maxLength={25}
          />

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
            placeholder="8 characters"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            showPasswordToggle
            required
            minLength={8}
            maxLength={8}
          />

          <Button type="submit" loading={loading} className="w-full">
            Create account
            <ArrowRight size={16} />
          </Button>

          <p className="text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[var(--fg)] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
