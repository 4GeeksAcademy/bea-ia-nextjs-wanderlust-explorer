"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/components/favorites-provider";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Experiences" },
  { href: "/favorites", label: "Favorites" },
  { href: "/profile", label: "Profile" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/experiences") {
    return (
      pathname === "/experiences" ||
      pathname.startsWith("/experiences/") ||
      pathname === "/experiencies" ||
      pathname.startsWith("/experiencies/")
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TopNav() {
  const pathname = usePathname();
  const { favoritesCount } = useFavorites();

  return (
    <header className="topNavWrapper">
      <nav className="topNav container">
        <Link href="/" className="brand">
          Wanderlust
        </Link>
        <ul className="navList" aria-label="Main navigation">
          {LINKS.map((item) => {
            const isActive = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`navLink${isActive ? " active" : ""}`}
                >
                  {item.label}
                  {item.href === "/favorites" ? ` (${favoritesCount})` : ""}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
