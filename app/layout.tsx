import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Region 9 Housing Needs Assessment Dashboard",
  description: "Comprehensive Housing Needs Assessment dashboard for Southwest Colorado's Region 9 counties, compliant with SB24-174 requirements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
