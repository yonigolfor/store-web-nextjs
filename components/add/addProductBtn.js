import classes from "./addProduct.module.css";
import { BsPlusCircleDotted } from "react-icons/bs";
import { useState } from "react";
import NewProductModal from "../modals/newProduct";

const DUMMY_PRODUCT_DATA = {
  name: "מוצר1",
  image:
    "https://media.cnn.com/api/v1/images/stellar/prod/230621042149-01-cristiano-ronaldo-euro-200-apps-062023-restricted.jpg?c=16x9&q=h_720,w_1280,c_fill/f_webp",
  price: 10,
  description: "תיאור מוצר 1",
};

export default function AddProductBtn() {
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };
  const opanProductModal = async (productData) => {
    setOpenModal(true);

    // setShowProductModal(true);
    // const res = await fetch("/api/new-product", {
    //   method: "POST",
    //   body: JSON.stringify(productData),
    //   headers: { "Content-Type": "application/json" },
    // });
    // const data = await res.json();
    // console.log("data sent", data);
  };

  return (
    <div>
      <div className={classes.container} onClick={opanProductModal}>
        <h2 style={{ color: "grey", opacity: 0.9 }}>הוסף מוצר חדש</h2>
        {/* <h1 className={classes.plus}>+</h1> */}
        <BsPlusCircleDotted className={classes.plus} size={100} />
      </div>
      {openModal && (
        <div className={classes.modal}>
          <NewProductModal closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}
