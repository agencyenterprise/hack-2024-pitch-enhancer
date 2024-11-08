"use client";

import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";

// Create a separate component for the sign-in content
function SignInContent() {
  const callbackUrl = `${process.env.NEXT_PUBLIC_URL}/pitching` || "/pitching";
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl });
  };

  return (
    <div className="w-full max-w-sm space-y-6 p-8 bg-gray-500/10 backdrop-blur-sm rounded-2xl border border-gray-200/10">
      <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>
      <p className="text-gray-300 text-center">
        Continue your journey to becoming a confident presenter
      </p>
      <button
        onClick={handleSignIn}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 rounded-lg bg-white/10 backdrop-blur-sm px-6 py-3 text-white border border-gray-200/20 shadow-md hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-white" />
        ) : (
          <svg className="h-6 w-6" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        {isLoading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
}

// Main component wrapped in Suspense
export default function SignIn() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      {/* Background gradients similar to home page */}
      <div className="absolute left-0 top-0 w-96 h-96 bg-teal-500/30 rounded-full filter blur-3xl opacity-20 -z-10" />
      <div className="absolute right-0 top-[20%] w-96 h-96 bg-pink-500/30 rounded-full filter blur-3xl opacity-20 -z-10" />

      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SignInContent />
      </Suspense>
    </div>
  );
}
