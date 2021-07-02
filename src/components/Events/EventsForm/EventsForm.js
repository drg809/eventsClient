import React, { useState, useCallback } from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useDropzone } from 'react-dropzone';
import { size } from 'lodash';
import { toast } from 'react-toastify';

import { CameraIcon } from '../../../utils/Icons';
import { uploadEventPhotoApi, createEventApi } from '../../../api/event';

import './EventsForm.scss';

export default function EventsForm() {
   const [formData, setFormData] = useState(initialValue());
   const [photoUrl, setPhotoUrl] = useState(null);
   const [photoFile, setPhotoFile] = useState(null);
   const [loading, setLoading] = useState(false);
   
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const onDropPhoto = useCallback(acceptedFile => {
      const file = acceptedFile[0];
      setPhotoUrl(URL.createObjectURL(file));
      setPhotoFile(file);
   });
   const { getRootProps: getRootPhotoProps, getInputProps: getInputPhotoProps } = useDropzone({
      accept: ['image/jpeg', 'image/png'],
      noKeyboard: true,
      multiple: false,
      onDrop: onDropPhoto
   });

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onSubmit = async e => {
      e.preventDefault();

      if (size(formData.name) < 1) {
         toast.warning('El nombre del evento no puede esta vacío.');
      } else if (size(formData.detail) < 1) {
         toast.warning('Los detalles del evento no pueden esta vacío.');
      } else {
         setLoading(true);
         if (photoFile) {
            await uploadEventPhotoApi(photoFile).catch(() => {
               toast.error('Error al subir la imágen al servidor');
            })
         };
         await createEventApi(formData).then(response => {
            if (response?.code >= 200 && response?.code < 300) {
               toast.success('El evento se ha creado');
               setFormData(initialValue());
               window.location.replace('/');
            }

         }).catch(() => {
            toast.warning('Error al crear el evento, inténtelo más tarde.')
         });
         setLoading(false);
      }
   };

   return (
      <div className='events-form'>
         <div className='photo' style={{ backgroundImage: `url(${photoUrl})` }} {...getRootPhotoProps()} >
            <input {...getInputPhotoProps()} />
            <CameraIcon />
         </div>
         <Form onSubmit={onSubmit} >
            <div className='formSubmit'>
               <Button type='submit' className='btn-submit' variant='primary'>
                  {loading && <Spinner animation='border' size='sm' />} Actualizar
               </Button>
            </div>
            <Form.Group>
               <Form.Control type='text' placeholder='Nombre del evento' name='name' defaultValue={formData.name} onChange={onChange} required />
            </Form.Group>
            <Form.Group>
               <Row>
                  <Col>
                     <Form.Control type='checkbox' name='type' defaultValue={formData.type} onChange={onChange} />
                  </Col>
                  <Col>
                     <DatePicker placeholder='Fecha del evento' locale={es} name='date' selected={new Date()} onChange={data => setFormData({ ...formData, date: data })} />
                  </Col>
               </Row>
            </Form.Group>
            <Form.Group>
               <Form.Control as='textarea' row='3' placeholder='Descripción del evento' type='text' name='detail' defaultValue={formData.detail} onChange={onChange} required />
            </Form.Group>
         </Form>
      </div>
   );
}

function initialValue() {
   return {
      userID: '',
      name: '',
      detail: '',
      date: new Date(),
      type: true,
      photo: ''
   }
}