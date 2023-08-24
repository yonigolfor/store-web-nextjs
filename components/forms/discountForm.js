import { Fragment, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import classes from "../../pages/payment/payment.module.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

export default function DiscountForm({ discountCode }) {
  const discountCodeRef = useRef();
  const discountAmount = 50;
  const discountValue =
    useSelector((state) => state.cart.discountPercent) || false;
  const [codeVerified, setCodeVerified] = useState(discountValue);
  const dispatch = useDispatch();

  function discountBtnHandler() {
    const inputCode = discountCodeRef.current.value;
    if (inputCode === discountCode) {
      setCodeVerified(true);
      dispatch(cartActions.setDiscountPercent(discountAmount));
    }
  }

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          margin: 15,
          marginBottom: 0,
        }}
      >
        <Form.Control
          className={classes.discountInput}
          type="text"
          placeholder="קוד הנחה"
          size="lg"
          ref={discountCodeRef}
          style={{ color: codeVerified ? "green" : "black" }}
          disabled={codeVerified}
        />
        <Button
          size="lg"
          style={{ marginRight: 5 }}
          variant={codeVerified ? "success" : "primary"}
          onClick={discountBtnHandler}
          disabled={codeVerified}
        >
          שלח
        </Button>
      </div>
      {codeVerified && (
        <p
          style={{ textAlign: "center", fontWeight: "bold" }}
        >{`!וואו... קיבלת הנחה של ${discountAmount} אחוזים`}</p>
      )}
    </Fragment>
  );
}

export function getStaticProps() {
  return {
    props: {
      discount: {
        code: "aaa",
      },
    },
  };
}
