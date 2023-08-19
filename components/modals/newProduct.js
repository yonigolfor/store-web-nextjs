//NewProductModal
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NewProductForm from "../forms/newProductForm";
import { useState } from "react";

export default function NewProductModal({ closeModal }) {
  const [newProdData, setNewProdData] = useState(null);
  const handleClose = () => closeModal();

  return (
    <>
      <Modal show={true} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>הוספת מוצר</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewProductForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
