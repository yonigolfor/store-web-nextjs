import classes from "./HeaderNavbar.module.css";
import Link from "next/link";

function HeaderNavbar() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Baller G.</div>
      <nav>
        <ul>
          <li>
            <Link href="/">המוצרים שלנו</Link>
          </li>
          <li>
            <Link href="/confirm">מי אנחנו</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderNavbar;
