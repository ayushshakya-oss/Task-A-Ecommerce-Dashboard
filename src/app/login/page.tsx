"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "@/stores/toast-store";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Badge } from "@/components/ui/Badge";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user, isLoading, logout } = useAuthStore();

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [demoApplied, setDemoApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFillDemo = () => {
    setUsername("emilys");
    setPassword("emilyspass");
    setDemoApplied(true);
    toast.info("Applied demo credentials (emilys / emilyspass)");
    setTimeout(() => setDemoApplied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    const result = await login({
      username: username.trim(),
      password: password.trim(),
    });
    setIsSubmitting(false);

    if (result.success) {
      toast.success(`Welcome back, ${user?.firstName || username}!`);
      router.push("/products");
    } else {
      setErrorMsg(
        result.error || "Failed to sign in. Please verify your credentials.",
      );
      toast.error(result.error || "Sign in failed");
    }
  };

  // If already authenticated, display account overview
  if (isAuthenticated && user) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center p-margin bg-background relative overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-xl p-space-lg sm:p-space-xl border border-surface-container text-center">
          <div className="flex justify-center mb-space-sm">
            <BrandLogo />
          </div>

          <div className="my-4 flex justify-center">
            <UserAvatar
              src={user.image}
              name={`${user.firstName} ${user.lastName}`}
              size="lg"
              ringColor="ring-4 ring-primary/20"
            />
          </div>

          <h2 className="text-xl font-bold text-on-surface">
            Signed in as {user.firstName} {user.lastName}
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            @{user.username} · {user.email}
          </p>

          <div className="mt-space-lg flex flex-col gap-2.5">
            <Link href="/products" className="w-full">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue Shopping
              </Button>
            </Link>

            <Link href="/profile" className="w-full">
              <Button variant="surface" size="md" className="w-full">
                View Full Profile
              </Button>
            </Link>

            <Button
              variant="danger"
              size="md"
              className="w-full"
              onClick={() => {
                logout();
                toast.info("You have signed out.");
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-margin bg-background relative overflow-hidden">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col w-full items-center justify-center relative py-space-xl">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-xl p-space-lg sm:p-space-xl transition-all duration-300 relative border border-surface-container">
          {/* Card Header & Brand */}
          <div className="flex flex-col items-center text-center">
            <div className="h-12 flex items-center justify-center mb-space-sm">
              <Link href="/">
                <BrandLogo />
              </Link>
            </div>

            <Badge variant="surface" dot className="mb-space-xs">
              Storefront Portal
            </Badge>

            <h1 className="text-2xl font-bold text-on-surface tracking-tight mt-space-xs">
              Welcome Back
            </h1>
            <p className="text-xs text-on-surface-variant mt-space-xs max-w-xs leading-relaxed">
              Sign in to manage your cart, track orders, and access exclusive
              member deals.
            </p>
          </div>

          {/* Quick Demo Credentials Bar */}
          <div className="mt-space-md p-2.5 bg-surface-container-low rounded-lg border border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-semibold text-on-surface">
                  Demo User Account
                </p>
                <p className="text-[10px] text-on-surface-variant">
                  emilys / emilyspass
                </p>
              </div>
            </div>

            <Button
              type="button"
              size="sm"
              variant={demoApplied ? "secondary" : "primary"}
              leftIcon={
                demoApplied ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : undefined
              }
              onClick={handleFillDemo}
            >
              {demoApplied ? "Applied" : "Fill Demo"}
            </Button>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="mt-space-sm p-3 rounded-lg bg-error-container/40 border border-error/20 text-error text-xs">
              {errorMsg}
            </div>
          )}

          {/* Login Form */}
          <form
            className="mt-space-md space-y-space-md"
            onSubmit={handleSubmit}
          >
            <Input
              id="usernameInput"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              leftIcon={<UserIcon className="w-4 h-4" />}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="block text-xs font-semibold text-on-surface"
                  htmlFor="passwordInput"
                >
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info('Use demo password "emilyspass" to sign in.');
                  }}
                  className="text-xs text-primary hover:text-primary-container transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="passwordInput"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                leftIcon={<Lock className="w-4 h-4" />}
                required
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label="Toggle password visibility"
                    className="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary-container accent-primary cursor-pointer"
                />
                <span className="text-xs text-on-surface font-medium">
                  Remember me
                </span>
              </label>

              <Badge
                variant="secondary"
                icon={<ShieldCheck className="w-3.5 h-3.5 text-secondary" />}
              >
                SSL 256-bit
              </Badge>
            </div>

            <Button
              id="submitBtn"
              type="submit"
              size="lg"
              variant="primary"
              className="w-full"
              isLoading={isSubmitting || isLoading}
              rightIcon={
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              }
            >
              Sign In
            </Button>
          </form>

          <div className="relative flex py-4 items-center mt-space-sm">
            <div className="flex-grow h-[1px] bg-surface-container-high" />
          </div>

          <div className="mt-space-sm text-center">
            <p className="text-xs text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() =>
                  toast.info(
                    "Registration is open. Use the demo account credentials to sign in.",
                  )
                }
                className="font-semibold text-primary hover:underline ml-1 cursor-pointer"
              >
                Sign up now
              </button>
            </p>
          </div>
        </div>

        {/* Footer status badges */}
        <div className="mt-space-md flex items-center gap-6 text-on-surface-variant text-[11px] font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>System Operational</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>v1.0.0 Release</span>
          </div>
        </div>
      </div>
    </main>
  );
}
