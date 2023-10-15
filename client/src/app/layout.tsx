import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Byungjin Lee",
  description: "Hello This is Byungjin Lee's website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
