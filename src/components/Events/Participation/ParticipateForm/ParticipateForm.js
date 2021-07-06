import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { participateEventApi } from '../../../../api/participarte';

import './ParticipateForm.scss';


export default function ParticipateForm(props) {
   const { event, setShowModal } = props;
   const [formData, setFormData] = useState(initialValue());
   const [loading, setLoading] = useState(false)

   console.log(props);

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onSubmit = async e => {
      e.preventDefault();

      setLoading(true);
      participateEventApi(event._id, formData).then(response => {
         if (response?.code >= 200 && response?.code < 300) {
            setFormData(initialValue());
            setShowModal(false);
            window.location.replace('/');
            toast.success(response.message);
         }
      }).catch(() => {
         toast.warning('Error al participar en el evento, inténtelo más tarde.')
      });
      setLoading(false);
   }

   return (
      <div className='participate-form'>
         <Form onSubmit={onSubmit} >
            <p>Pulsa 'continuar' para confirmar la participación en el evento.</p>
            <Form.Group>
               <Form.Control as='textarea' row='3' placeholder='Introduce aquí alguna nota cómo indicación para los organizadores, alergias que puedas tener, información complementaría que quieras pedir, etc...' type='text' name='details' defaultValue={formData.details} onChange={onChange} />
            </Form.Group>
            <div className='formSubmit'>
               <Button type='submit' className='btn-submit' variant='primary'>
                  {loading && <Spinner animation='border' size='sm' />} Continuar
               </Button>
            </div>
         </Form>
      </div>
   );
}

function initialValue() {
   return {
      details: ''
   };
}