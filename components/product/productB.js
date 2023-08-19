import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "./ProductCard.module.css";

function ProductB({ productName, image, description }) {
  return (
    <Card
      className={classes.container}
      style={{ width: "18rem" }}
      border="dark"
    >
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Text>{description || productName}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductB;
