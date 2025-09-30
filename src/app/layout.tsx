import { Inter, DM_Serif_Text, Roboto_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";

import "./globals.css";

const body = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-family-body",
});

const heading = DM_Serif_Text({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
  variable: "--font-family-heading",
});

const mono = Roboto_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-family-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${heading.variable} ${mono.variable}`}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            error: {
              style: {
                background: "#fef2f2", // red-50
                color: "#991b1b", // red-800
                border: "1px solid #fecaca", // red-200
              },
              iconTheme: {
                primary: "#dc2626", // red-600
                secondary: "#fef2f2", // red-50
              },
            },
          }}
        />
      </body>
    </html>
  );
}
