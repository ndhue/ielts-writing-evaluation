import { Sidebar } from "@/components";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Sidebar />
      <section className="ml-28 mt-8 mr-8">{children}</section>
    </section>
  );
}
