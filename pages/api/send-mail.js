import emailjs from "@emailjs/browser";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // needs to be POST cuz get data
    // getting the data from the form
    const emailData = req.body;
    console.log("email data: " + emailData);

    const serviceId = "service_0pwwag8";
    const templateId = "template_1fw3ihg";
    const publicKey = "Af3Fw2s7Qnz140Q1s";
    emailjs.init(publicKey);

    const email_template_params = {
      from_name: "Yoni GOALLL",
      customer_details: emailData.customer_details,
      orderDetails: emailData.orderDetails,
      // email goes to -
      recipient: "YoniGolfor@gmail.com",
    };

    try {
      console.log("reach");
      await emailjs.send(serviceId, templateId, email_template_params);
      console.log("reach2");
      res.status(201).json({ message: "Email sent Successfully" });
      console.log("reach3");
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "error occurred" });
    }
  }
}
