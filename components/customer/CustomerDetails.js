import { useSelector } from "react-redux";
import classes from "./customerDetails.module.css";
import Button from "react-bootstrap/Button";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";

export default function CustomerDetails() {
  const customerData = useSelector((state) => state.customer);
  const paymentMethod = useSelector(
    (state) => state.cart.deliveryData.deliveryString
  );
  const orderData = useSelector((state) => state.cart);
  const router = useRouter();
  // console.log(paymentMethod);

  const customerDetailsToString = () => {
    let str = "";
    for (const key in customerData) {
      str += `${key}: ${customerData[key]}\n`;
    }
    return str;
  };

  const productsListToStr = () => {
    let str = "";
    for (let i = 0; i < orderData.productsList.length; i++) {
      const productData = orderData.productsList[i];
      str += `${i + 1}. ${productData.name}: `;
      str += `כ- ${productData.counter} יחידות\n`;
      str += `מחיר ליחידה: ${productData.pricePerUnit}\n`;
    }
    return str;
  };

  const orderDetailsToString = () => {
    console.log("totalPrice to string:", orderData.totalPrice);
    let orderDetailsStr = "";
    orderDetailsStr = productsListToStr();
    if (orderData.discountPercent) {
      orderDetailsStr += `התקבלה הנחה של כ- ${orderData.discountPercent}% \n`;
    }
    orderDetailsStr += `סהכ לתשלום: ${orderData.totalPrice}`;

    return orderDetailsStr;
  };

  // async function sendMail() {
  //   const emailData = {
  //     customer_details: customerDetailsToString(),
  //     orderDetails: orderDetailsToString(),
  //   };
  //   try {
  //     const res = await fetch("/api/send-mail", {
  //       method: "POST",
  //       body: JSON.stringify(emailData),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const data = await res.json();
  //     if (data.message.includes("error")) throw new Error(data.message);
  //     console.log("data sent", data);

  //     alert("email successfully sent check inbox");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function sendMail() {
    // send to email: productsList, totalPrice including discount if has, delivery,
    // customerDetails.
    const serviceId = "service_0pwwag8";
    const templateId = "template_1fw3ihg";
    const publicKey = "Af3Fw2s7Qnz140Q1s";
    emailjs.init(publicKey);

    const email_template_params = {
      from_name: "Yoni GOALLL",
      customer_details: customerDetailsToString(),
      orderDetails: orderDetailsToString(),
      // email goes to -
      recipient: "YoniGolfor@gmail.com",
    };

    try {
      await emailjs.send(serviceId, templateId, email_template_params);
      alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
    }
  }

  function sendBtnHandler() {
    // send mail to store owner
    sendMail();
    // move to next approved page
    router.replace("/confirm");
  }
  return (
    <div className={classes.container}>
      {/* Add User Details Here using customerData */}
      <div>
        <h1 className={classes.titleClass}>פרטי לקוח</h1>
        <p className={classes.pClass}>{customerData.fullName}</p>
        <p>{customerData.phoneNumber}</p>
        <p>{customerData.email}</p>
        <p>{customerData.address}</p>
      </div>
      {customerData.userNotes && (
        <div>
          <h2 className={classes.titleClass}>הערות לגבי ההזמנה</h2>
          <p>{customerData.userNotes}</p>
        </div>
      )}
      {/* Add userNotes */}
      <h2 className={classes.titleClass}>שיטת תשלום</h2>
      {/* Add payment method from the cart store */}
      <p>{paymentMethod}</p>
      {/* Add button קנה עכשיו */}
      <Button size="lg" variant="primary" onClick={sendBtnHandler}>
        המשך
      </Button>
    </div>
  );
}
