import { QueryClientProvider } from "@/providers/QueryClientProvider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "react-circular-progressbar/dist/styles.css";
import "../styles/globals.css";

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
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
