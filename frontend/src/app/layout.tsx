import type { Metadata } from "next";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        
        closeOnClick
        draggable
        pauseOnHover
      />
      <body>{children}</body>
    </html>
  );
}
