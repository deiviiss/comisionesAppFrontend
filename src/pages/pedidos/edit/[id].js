import { useState } from 'react';
import Form from '@components/FormPedido';
import Modal from '@common/Modal';

export default function EditPedido() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Form setOpen={setOpen} />
      {/* pedido form */}
      <Modal open={open} setOpen={setOpen}>
      </Modal>
    </>)
};