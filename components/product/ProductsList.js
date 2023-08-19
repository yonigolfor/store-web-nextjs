import AddProductBtn from "../add/addProductBtn";
import Product from "./Product";
import classes from "./ProductsList.module.css";

const DUMMY_IMAGE =
  "https://media.cnn.com/api/v1/images/stellar/prod/230621042149-01-cristiano-ronaldo-euro-200-apps-062023-restricted.jpg?c=16x9&q=h_720,w_1280,c_fill/f_webp";
export default function ProductsList({ productsList }) {
  return (
    <div className={classes.container}>
      <AddProductBtn />
      {productsList.map((product) => (
        <Product
          productName={product.name}
          image={product.image || DUMMY_IMAGE}
          description={product.description || product.name}
          price={product.price}
          key={product.name}
        />
      ))}
    </div>
  );
}
