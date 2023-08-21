import { Fragment, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import classes from "./newProductForm.module.css";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

export default function NewProductForm({ handleClose }) {
  // connection to db
  const [imageUploadBase64, setImageUploadBase64] = useState("");
  const prodNameRef = useRef();
  const prodPriceRef = useRef();
  const descriptionRef = useRef();
  const dispatch = useDispatch();

  async function AddToDb(productData) {
    // productData = {
    //  name: ,
    //   image: ,
    //   price: ,
    //   description: ,
    // }
    const res = await fetch("/api/new-product", {
      method: "POST",
      body: JSON.stringify(productData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("data sent", data);
  }

  function convertToBase64(fName) {
    let reader = new FileReader();
    reader.readAsDataURL(fName);
    reader.onload = () => {
      return reader.result; //base64 encoded string
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  }

  const createHandler = () => {
    const productData = {
      name: prodNameRef.current.value,
      image: imageUploadBase64,
      price: prodPriceRef.current.value,
      description: descriptionRef.current.value,
    };
    if (!productData.image) return;

    console.log(productData);

    AddToDb(productData);

    // update allAvailableProduct
    dispatch(cartActions.addProductToAllProductsAvailable(productData));
    handleClose();
  };

  return (
    <div className={classes.container}>
      <Form.Control
        // className={classes.discountInput}
        type="text"
        placeholder="שם המוצר"
        size="lg"
        ref={prodNameRef}
        style={{ margin: 5 }}
      />
      {/* <Form.Label>מחיר: </Form.Label> */}

      <Form.Control
        type="number"
        placeholder="מחיר בשקלים"
        size="lg"
        ref={prodPriceRef}
        style={{ margin: 5 }}
      />
      <Form.Control
        ref={descriptionRef}
        // className={classes.formInput}
        as="textarea"
        rows={3}
        placeholder="תיאור מוצר"
        style={{ margin: 5 }}
      />
      {/* Demo: gets url of image */}
      <Form.Control
        // className={classes.discountInput}
        type="text"
        placeholder="לינק לתמונה"
        size="lg"
        onChange={(e) => setImageUploadBase64(e.target.value)}
        style={{ margin: 5 }}
      />

      {/* For now get only url and updates productsList */}
      {/* <input
        className={classes.fileInput}
        accept="image/*"
        type="file"
        style={{ margin: 5 }}
        onChange={(e) =>
          setImageUploadBase64(convertToBase64(e.target.files[0]))
        }
      /> 
      // Shows the picked Image:
      {imageUploadBase64 ? (
        <img src={imageUploadBase64} width={180} height={250} />
      ) : null}
*/}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          בטל
        </Button>
        <Button variant="primary" onClick={createHandler}>
          שמור מוצר
        </Button>
      </Modal.Footer>
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      discount: {
        code: "aaa",
      },
    },
  };
}
