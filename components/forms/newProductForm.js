import { Fragment, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import classes from "./newProductForm.module.css";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function NewProductForm({ handleClose }) {
  // connection to db
  const [imageUploadBase64, setImageUploadBase64] = useState(null);
  const prodNameRef = useRef();
  const prodPriceRef = useRef();
  const descriptionRef = useRef();

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
      setImageUploadBase64(reader.result); //base64 encoded string
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
      <input
        className={classes.fileInput}
        accept="image/*"
        type="file"
        style={{ margin: 5 }}
        onChange={(e) => convertToBase64(e.target.files[0])}
      />
      {imageUploadBase64 ? (
        <img src={imageUploadBase64} width={180} height={250} />
      ) : null}

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
