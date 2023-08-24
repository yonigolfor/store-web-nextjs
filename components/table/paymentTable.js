import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import classes from "./paymentTable.module.css";
import { useEffect, useState } from "react";
import { cartActions } from "../../store/cart";

export default function PaymentTable({ isOrderForm = false }) {
  // need to add delivery data to be able to show it on table
  // in case of summary page.
  // deliveryData = {deliveryStyle, price}
  const productsList = useSelector((state) => state.cart.productsList);
  // const [totalPrice, setTotalPrice] = useState(false);
  const deliveryData = useSelector((state) => state.cart.deliveryData);
  // const dispatch = useDispatch();
  const totalPrice = isOrderForm
    ? useSelector((state) => state.cart.totalPrice)
    : useSelector((state) => state.cart.totalPrice) + // total cart price
      useSelector((state) => state.cart.deliveryPrice); // added delivery price
  const discountPercent = useSelector((state) => state.cart.discountPercent);

  // function priceAfterDiscount(totalPrice, discountPercent) {
  //   const percent = 1 - discountPercent / 100;
  //   return Math.ceil(totalPrice * percent);
  // }

  function getTotalPrice() {
    let totalPrice = productsList.reduce(
      (acc, currentProduct) =>
        acc + currentProduct.counter * currentProduct.pricePerUnit,
      0
    );

    if (deliveryData.deliveryPrice) totalPrice += deliveryData.deliveryPrice;
    if (discountPercent) return priceAfterDiscount(totalPrice, discountPercent);

    return totalPrice;
  }

  return (
    <Table className={classes.table_class} striped hover responsive="sm">
      <thead>
        <tr>
          <th>סה"כ</th>
          <th>מחיר</th>
          <th>כמות</th>
          <th>כותרת</th>
        </tr>
      </thead>
      <tbody>
        {productsList.map((product) => (
          <tr key={product.name}>
            <td>{product.pricePerUnit * product.counter}</td>
            <td>{product.pricePerUnit}</td>
            <td>{product.counter}</td>
            <td>{product.name}</td>
          </tr>
        ))}
        {deliveryData.deliveryPrice && !isOrderForm ? (
          <tr>
            <td>{deliveryData.deliveryPrice}</td>
            <td></td>
            <td></td>
            <td>
              שיטת משלוח: <br /> {deliveryData.deliveryString}
            </td>
          </tr>
        ) : null}
        <tr className={discountPercent ? classes.domTotalPrice : null}>
          <td>{totalPrice}</td>
          <td></td>
          <td></td>
          <td>סה"כ</td>
        </tr>
      </tbody>
    </Table>
  );
}
