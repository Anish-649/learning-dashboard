"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-bg-primary">
      <div className="text-center space-y-4 max-w-md p-8">
        <div className="flex justify-center">
          <AlertTriangle className="w-12 h-12 text-accent-rose" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white">
          Something went wrong
        </h2>
        <p className="text-white/50 text-sm">
          Could not connect to the database. Check your Supabase environment
          variables and try again.
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
