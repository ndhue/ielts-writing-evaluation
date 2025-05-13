import type { Metadata } from "next";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import "react-circular-progressbar/dist/styles.css";
import { Sidebar } from "@/components";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Kuromies - AI Writing Evaluation",
  icons: {
    icon: "/icon.png",
  },
  description: "Kuromies - AI Writing Evaluation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Sidebar />
        <section className="ml-28 mt-8 mr-8">{children}</section>
      </body>
    </html>
  );
}
