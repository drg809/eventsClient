import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { cancelEventPartApi } from '../../../../api/participarte';

import './CancelForm.scss';


export default function CancelForm(props) {
   const { event, setShowModal } = props;
   // eslint-disable-next-line no-unused-vars
   const [formData, setFormData] = useState({});
   const [loading, setLoading] = useState(false)

   console.log(props);

   const onSubmit = async e => {
      e.preventDefault();

      setLoading(true);
      cancelEventPartApi(event._id).then(response => {
         if (response?.code >= 200 && response?.code < 300) {
            setFormData({});
            setShowModal(false);
            window.location.replace('/');
            toast.success(response.message);
         }
      }).catch(() => {
         toast.warning('Error al cancelar la participación al evento, inténtelo más tarde.')
      });
      setLoading(false);
   }

   return (
      <div className='cancel-form'>
         <Form onSubmit={onSubmit} >
            <p>¿Está seguro que desea no participar en el evento?.</p>
            <div className='formSubmit'>
               <Button type='submit' className='btn-submit' variant='primary'>
                  {loading && <Spinner animation='border' size='sm' />} Continuar
               </Button>
            </div>
         </Form>
      </div>
   );
}