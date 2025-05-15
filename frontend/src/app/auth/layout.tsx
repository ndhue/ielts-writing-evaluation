// app/auth/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-background h-screen w-screen flex flex-cols justify-center items-center">
      {children}
    </section>
  );
}
