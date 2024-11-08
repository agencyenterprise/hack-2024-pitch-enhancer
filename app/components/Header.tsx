"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-50">
      <div className="max-w-7xl mx-auto h-full px-4 flex justify-end items-center">
        <nav className="flex gap-4">
          {session ? (
            <>
              <span className="text-sm font-thin text-white self-center">
                {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-1.5 text-sm font-semibold text-red-300 hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="px-4 py-1.5 text-sm font-semibold text-red-300 hover:text-white transition-colors"
              >
                Login
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
