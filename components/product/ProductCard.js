import classes from "./ProductCard.module.css";

export default function ProductCard(props) {
  return <div className={classes.ProductCard}>{props.children}</div>;
}
