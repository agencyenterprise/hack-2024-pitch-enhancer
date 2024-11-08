"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto h-full px-4 flex justify-end items-center">
        <nav className="flex gap-4">
          {session && (
            <>
              <span className="text-sm text-white self-center">
                {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-1.5 text-sm text-white hover:text-red-300 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
