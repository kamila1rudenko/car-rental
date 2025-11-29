"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";
import mainCss from "@/app/Home.module.css";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={mainCss.container}>
        <div className={css.wrapperHeader}>
          <Link className={css.logo} href="/">
            <svg
              className={css.logoIcon}
              width="104"
              height="16"
              aria-hidden="true"
            >
              <use href="/svg-sprite.svg#icon-logo" />
            </svg>
          </Link>

          <nav className={css.nav}>
            <ul className={css.listHeader}>
              <li>
                <Link
                  href="/"
                  className={`${css.listNavItem} ${pathname === "/" ? css.active : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className={`${css.listNavItem} ${
                    pathname.startsWith("/catalog") ? css.active : ""
                  }`}
                >
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
