// /api/new-meetup
import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    // getting the data from the form
    const data = req.body;
    console.log(data);
    // const { name, image, price, description } = data;
    // Sending the data to the database

    const client = await MongoClient.connect(
      "mongodb+srv://YoniGolfor:Yoni2023@cluster0.apmkq.mongodb.net/aStore?retryWrites=true&w=majority"
    );
    const db = client.db();
    const productsCollection = db.collection("products");
    const result = await productsCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: "Product Inserted Successfully" });
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};
// mongodb+srv://<username>:<password>@cluster0.apmkq.mongodb.net/?retryWrites=true&w=majority
