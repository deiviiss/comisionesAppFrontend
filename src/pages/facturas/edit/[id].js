import { useState } from 'react';
import Form from '@components/Form';
import Modal from '@common/Modal';

export default function EditFactura() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Form setOpen={setOpen} />
      {/* factura form */}
      <Modal open={open} setOpen={setOpen}>
      </Modal>
    </>)
};