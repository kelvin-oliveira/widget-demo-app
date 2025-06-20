import "./globals.css";
import { Geist } from "next/font/google";

export { metadata } from "@/constants/metadata";

const font = Geist({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
