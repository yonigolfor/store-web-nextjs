import { Fragment } from "react";
import PaymentTable from "../../components/table/paymentTable";

import { useSelector } from "react-redux";
import CustomerDetails from "../../components/customer/CustomerDetails";

// need to understand how to pass params to here after navigating programaticlly.
// need to pass discountPercent and deliveryData

export default function OrderSummary() {
  return (
    <Fragment>
      <h1>סיכום ההזמנה שלך</h1>
      <PaymentTable />
      <CustomerDetails />
    </Fragment>
  );
}

// export function getStaticProps() {
//   // execute at pre-rendering the page
//   // return { props: { deliveryData: {} } };
// }
