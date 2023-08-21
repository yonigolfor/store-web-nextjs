import ProductCard from "./ProductCard";
import Button from "react-bootstrap/Button";
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

export default function Product({ productName, image, description, price }) {
  const dispatch = useDispatch();

  function addToCartHandler() {
    dispatch(
      cartActions.addProduct({
        name: productName,
        price: Number(price),
        image,
        description,
      })
    );
  }
  return (
    <ProductCard prodId={productName}>
      <img
        src={image}
        alt={productName}
        // height={260} => back to Non-Dummy images requires change in height
        height={180}
      />
      <h2>{productName}</h2>
      <h4>{description}</h4>
      <h5>{price}</h5>
      <div className="d-grid gap-2">
        <Button onClick={addToCartHandler} className="button" variant="primary">
          <BsFillCartFill color="black" size={24} /> הוסף לעגלה
        </Button>
      </div>
    </ProductCard>
  );
}
