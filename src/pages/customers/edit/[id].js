import { useState } from 'react';
import Form from '@components/FormCustomer';
import Modal from '@common/Modal';

export default function EditCustomer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Form setOpen={setOpen} />
      {/* customer form */}
      <Modal open={open} setOpen={setOpen}>
      </Modal>
    </>)
};