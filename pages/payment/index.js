import { Fragment } from "react";
import PaymentTable from "../../components/table/paymentTable";
import DiscountForm from "../../components/forms/discountForm";
import OrderForm from "../../components/forms/OrderForm";

export default function Payment({ discountCode }) {
  return (
    <Fragment>
      <h1>סל הקניות</h1>
      <PaymentTable isOrderForm={true} />
      <DiscountForm discountCode={discountCode} />
      <OrderForm />
    </Fragment>
  );
}

export function getStaticProps() {
  // Server Side
  return {
    props: {
      discountCode: "ךכ2ץמקא",
    },
  };
}
