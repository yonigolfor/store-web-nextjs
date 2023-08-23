import { Fragment } from "react";
import Header from "../../components/header";
import ProductsList from "../../components/product/ProductsList";
import SplitRowContainer from "../../components/dynamic-container/SplitRowContainer";
import Cart from "../../components/cart/Cart";
import { useSelector } from "react-redux";

const DUMMY_PRODUCTS = [
  {
    name: "Demoמוצר1",
    image:
      "https://media.cnn.com/api/v1/images/stellar/prod/230621042149-01-cristiano-ronaldo-euro-200-apps-062023-restricted.jpg?c=16x9&q=h_720,w_1280,c_fill/f_webp",
    price: 10,
    description: "תיאור מוצר 1",
  },
  {
    name: "Demoמוצר2",
    image:
      "https://i.guim.co.uk/img/media/3f183e3024872dc0280012487854dc5807048166/0_42_3600_2160/master/3600.jpg?width=1140&dpr=2&s=none",
    price: 20,
    description: "תיאור מוצר 2",
  },
  { name: "Demoמוצר3", price: 30, description: "תיאור מוצר 3" },
  { name: "Demoמוצר4", price: 40, description: "תיאור מוצר 4" },
  { name: "Demoמוצר5", price: 50, description: "תיאור מוצר 5" },
];

export default function Store() {
  // get products
  const prooductsFromDb = useSelector(
    (state) => state.cart.allProductsAvailable
  );
  const products = [...prooductsFromDb, ...DUMMY_PRODUCTS];
  console.log("products:", products);
  console.log("products from mongo:", prooductsFromDb);

  return (
    <Fragment>
      <h1>!המוצרים שלנו</h1>
      <div style={{ marginLeft: 40 }}>
        <SplitRowContainer>
          <ProductsList productsList={products} />
          <Cart />
        </SplitRowContainer>
      </div>
    </Fragment>
  );
}

// export async function getStaticProps() {
//   // can fetch data securely. this code will not appear in client-side.
//   // This code will not appear even in other clients machines!
//   console.log("getting all products");
//   const client = await MongoClient.connect(
//     "mongodb+srv://YoniGolfor:Yoni2023@cluster0.apmkq.mongodb.net/store?retryWrites=true&w=majority"
//   );
//   const db = client.db();
//   const productsCollection = db.collection("products");
//   const products = await productsCollection.find().toArray(); //gets all meetups
//   console.log("Got all meetups Successfully: ", products);

//   client.close();

//   return {
//     props: {
//       meetups: products.map((product) => ({
//         title: product.title,
//         address: product.address,
//         image: product.image,
//         id: product._id.toString(),
//       })),
//     },
//     revalidate: 1,
//   };
// }
