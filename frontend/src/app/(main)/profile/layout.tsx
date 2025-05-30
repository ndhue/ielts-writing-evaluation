// Example usage in app/(protected)/layout.tsx
import { ProtectedRoute } from "@/components/auth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
