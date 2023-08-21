import { Fragment, useEffect } from "react";
import Store from "./store/index";
import { MongoClient } from "mongodb";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";

export default function Homepage({ products }) {
  // update allProductsAvailable in cart
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartActions.setAllProductsAvailable(products));
  }, []);

  return (
    <Fragment>
      <Store />
    </Fragment>
  );
}

export async function getStaticProps() {
  // can fetch data securely. this code will not appear in client-side.
  // This code will not appear even in other clients machines!
  const client = await MongoClient.connect(
    "mongodb+srv://YoniGolfor:Yoni2023@cluster0.apmkq.mongodb.net/aStore?retryWrites=true&w=majority"
  );
  const db = client.db();
  const productsCollection = db.collection("products");
  const products = await productsCollection.find().toArray(); //gets all products
  console.log("Got all products Successfully: ", products);

  client.close();

  return {
    props: {
      products: products.map((product) => ({
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        id: product._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
