import { Fragment, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./orderForm.module.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
import { customerActions } from "../../store/customer";

const DUMMY_DELIVERY_OPTIONS = [
  { deliveryDescription: "איסוף עצמי 🔥", deliveryPrice: 0 },
  { deliveryDescription: "משלוח בדואר ", deliveryPrice: 29 },
  { deliveryDescription: "משלוח עד הבית", deliveryPrice: 59 },
];

export default function OrderForm() {
  const [deliveryValue, setDeliveryValue] = useState(0);
  const emailRef = useRef();
  const fullNameRef = useRef();
  const addressRef = useRef();
  const phoneNumberRef = useRef();
  const deliveryRef = useRef();
  const notesRef = useRef();
  const paymentMethodRef = useRef();

  const router = useRouter();
  const dispatch = useDispatch();

  function extractNumOutOfDesc(desc) {
    return DUMMY_DELIVERY_OPTIONS.find(
      (option) => option.deliveryDescription === desc
    ).deliveryPrice;
  }

  const checkValidMail = (mail) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail);

  function formIsFilled() {
    if (deliveryValue === 0) return false;
    return true;
  }

  const sendBtnHandler = () => {
    if (!formIsFilled()) {
      window.alert("מלא את כל שדות החובה");
      return;
    }
    // add data to customer store
    const deliveryDescription = deliveryRef.current.value;
    const deliveryData = {
      deliveryString: deliveryDescription,
      deliveryPrice: extractNumOutOfDesc(deliveryDescription),
    };
    dispatch(cartActions.setDeliveryData(deliveryData));
    if (deliveryData.deliveryPrice > 0)
      dispatch(cartActions.setDeliveryPrice(deliveryData.deliveryPrice));
    dispatch(
      customerActions.setCustomerData({
        email: emailRef.current.value,
        fullName: fullNameRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        address: addressRef.current.value,
        paymentMethod: paymentMethodRef.current.value,
        userNotes: notesRef.current.value,
      })
    );
    router.push("/orderSummary");
  };

  return (
    <Fragment>
      <p className={classes.pClass}>ביצוע הזמנה</p>
      <Form.Group
        className={classes.OrderForm}
        controlId="exampleForm.ControlInput1"
      >
        <div>
          <Form.Label>אימייל</Form.Label>
          <Form.Control
            className={classes.formInput}
            size="lg"
            type="email"
            placeholder="name@example.com"
            ref={emailRef}
          />
        </div>
        <div>
          <Form.Label>שם מלא</Form.Label>
          <Form.Control
            className={classes.formInput}
            size="lg"
            type="text"
            placeholder="ישראל ישראלי"
            ref={fullNameRef}
          />
        </div>
        <div>
          <Form.Label>רוצה משלוח? תרשום: כתובת, עיר, מיקוד</Form.Label>
          <Form.Control
            ref={addressRef}
            className={classes.formInput}
            size="lg"
            type="text"
          />
        </div>
        <div>
          <Form.Label>מספר טלפון</Form.Label>
          <Form.Control
            className={classes.formInput}
            size="lg"
            type="text"
            placeholder="050-1234-567"
            ref={phoneNumberRef}
          />
        </div>
      </Form.Group>
      <Form.Group
        className={classes.sendOptions}
        controlId="exampleForm.ControlInput2"
      >
        <div>
          <Form.Label>* שיטת משלוח</Form.Label>
          <Form.Select
            className={classes.formInput}
            aria-label="select-send-option"
            size="lg"
            value={deliveryValue}
            onChange={(e) => setDeliveryValue(e.target.value)}
            ref={deliveryRef}
          >
            <option value={0} style={{ textAlign: "end" }}>
              בחר
            </option>
            {DUMMY_DELIVERY_OPTIONS.map((option) => (
              <option
                key={option.deliveryDescription}
                value={option.deliveryDescription}
              >{`${option.deliveryDescription} - ${option.deliveryPrice} ש"ח`}</option>
            ))}
            {/* <option value={'איסוף עצמי 🔥 - 0 ש"ח'}>
              איסוף עצמי 🔥 - 0 ש"ח
            </option>
            <option value={'משלוח בדואר - 29 ש"ח'}>משלוח בדואר - 29 ש"ח</option>
            <option value={'משלוח עד הבית - 59 ש"ח'}>
              משלוח עד הבית - 59 ש"ח
            </option> */}
          </Form.Select>
        </div>
        <div style={{ marginTop: 15 }}>
          <Form.Label>* שיטת תשלום</Form.Label>
          <Form.Select
            className={classes.formInput}
            aria-label="select-send-option"
            size="lg"
            ref={paymentMethodRef}
          >
            <option value={0}>בחר</option>
            <option value={"מזומן במשלוח"}>מזומן במשלוח</option>
            <option value="העברה בנקאית">העברה בנקאית</option>
          </Form.Select>
        </div>
        {/* <div style={{ marginTop: 15 }}>
          <Form.Label>הערות לגבי ההזמנה</Form.Label>
          <Form.Select
            className={classes.formInput}
            aria-label="select-send-option"
            size="lg"
          >
            <option style={{ textAlign: "end" }}>מזומן במשלוח</option>
            <option value="1">העברה בנקאית</option>
          </Form.Select>
        </div> */}
        <Form.Label style={{ marginTop: 15 }}>הערות לגבי ההזמנה</Form.Label>
        <Form.Control
          ref={notesRef}
          className={classes.formInput}
          as="textarea"
          rows={3}
        />
      </Form.Group>
      <div className={classes.sendBtn}>
        <Button size="lg" variant="primary" onClick={sendBtnHandler}>
          המשך
        </Button>
      </div>
    </Fragment>
  );
}
