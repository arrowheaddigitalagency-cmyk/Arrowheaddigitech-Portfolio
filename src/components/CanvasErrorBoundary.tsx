/**
 * Lightweight WebGL error boundary.
 * React 19 bundled types don't expose Component generics in all environments,
 * so we use a simple state-based fallback wrapper.
 */
import React, { useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export default function CanvasErrorBoundary({ children, fallback }: Props) {
  const [crashed, setCrashed] = useState(false);

  useEffect(() => {
    const handler = (e: ErrorEvent) => {
      // Catch WebGL / Three.js context errors
      if (
        e.message?.includes("WebGL") ||
        e.message?.includes("THREE") ||
        e.message?.includes("canvas")
      ) {
        setCrashed(true);
      }
    };
    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);

  if (crashed) return <>{fallback}</>;
  return <>{children}</>;
}
