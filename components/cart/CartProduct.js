import { Fragment, useEffect, useState } from "react";
import classes from "./CartProduct.module.css";
import SplitRowContainer from "../dynamic-container/SplitRowContainer";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

export default function CartProduct({
  productName,
  image,
  description,
  price,
  count,
}) {
  const [amount, setAmount] = useState(count);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateCart();
    }, 100); // wait 100 miliseconds before update

    return () => {
      clearTimeout(timeout);
    };
  }, [amount]);

  function updateCart() {
    dispatch(
      cartActions.updateCounter({
        productName,
        updatedCounter: amount,
      })
    );
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  if (count > 0)
    return (
      <Fragment>
        <SplitRowContainer>
          <div
            className={classes.product}
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <img className={classes.cartImg} src={image} />
            <p className={classes.text}>{productName}</p>
            <p className={classes.text}>{description}</p>
            {/* <h4>{price}</h4>*/}
            <input
              className={classes.inputNumber}
              type="number"
              pattern="[0-9]*"
              value={count}
              onChange={handleAmountChange}
            />
            {/* <h4>{count}</h4> */}
          </div>
        </SplitRowContainer>
      </Fragment>
    );
}
