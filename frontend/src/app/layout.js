import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Brainly — Your Personal Knowledge Hub",
  description:
    "Capture, store, and revisit knowledge from across the internet with a clean, minimal workspace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Toaster position="top-center" theme="dark" richColors />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
