import classes from "./Cart.module.css";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import Button from "react-bootstrap/Button";
import Link from "next/link";

export default function Cart() {
  const productsList = useSelector((state) => state.cart.productsList);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  if (totalPrice > 0)
    return (
      <div className={classes.container}>
        <p className={classes.title}>סל הקניות</p>
        <div className={classes.productsContainer}>
          {/* render list of products with the option to change number of products*/}
          {productsList.map((prod) => (
            <h3 key={prod.name}>
              <CartProduct
                key={prod.name}
                productName={prod.name}
                image={prod.image}
                description={prod.description}
                price={prod.pricePerUnit}
                count={prod.counter}
              />
            </h3>
          ))}
        </div>

        {/* calculate total amount */}
        {<p className={classes.p_class}>{`סך הכל: ${totalPrice} ש"ח`}</p>}

        {/* pay button to move to payment page */}
        <Link href={"/payment"}>
          <Button className={classes.button_class}>לקופה</Button>
        </Link>
      </div>
    );
}
