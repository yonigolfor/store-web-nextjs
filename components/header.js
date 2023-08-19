import classes from "./header.module.css";

export default function Header() {
  const TITLE = "Baller G.";
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{TITLE}</h1>
      {/* <h3>צד ימין</h3> */}
    </div>
  );
}
