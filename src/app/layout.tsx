import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { FavoritesProvider } from "@/components/favorites-provider";
import { TopNav } from "@/components/top-nav";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wanderlust Explorer",
  description: "Explorador multipagina de experiencias con busqueda y filtros en URL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.variable} ${fraunces.variable}`}>
      <body>
        <FavoritesProvider>
          <TopNav />
          <main className="mainContent">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
