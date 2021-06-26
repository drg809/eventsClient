import React, { useState, useCallback } from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { API_HOST } from '../../../utils/constant';
import { CameraIcon } from '../../../utils/Icons';
import { uploadEventPhotoApi, createEventApi } from '../../../api/event';

import './EditUserForm.scss';

export default function EventsForm(props) {
   const { event, setShowModal } = props;
   const [formData, setFormData] = useState(initialValue(event));
   const [photoUrl, setPhotoUrl] = useState(
      event?.photo ? `${API_HOST}/events/photo?id=${event.id}` : null
   );
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
      setLoading(true);
      if (photoFile) {
         await uploadEventPhotoApi(photoFile).catch(() => {
            toast.error('Error al subir la imágen al servidor');
         })
      };
      await createEventApi(formData).then(() => {
         setShowModal(false);
      }).catch(() => {
         toast.error('Error al crear el evento.')
      });
      setLoading(false);
      window.location.reload();
   };

   return (
      <div className='events-form'>
         <div className='photo' style={{ backgroundImage: `url(${photoUrl})` }} {...getRootPhotoProps()} >
            <input {...getInputPhotoProps()} />
            <CameraIcon />
         </div>
         <Form onSubmit={onSubmit} >
            <Form.Group>
               <Form.Control type='text' placeholder='Nombre del evento' name='name' defaultValue={formData.name} onChange={onChange} />
            </Form.Group>
            <Form.Group>
               <Row>
                  <Col>
                     <Form.Control type='checkbox' name='type' defaultValue={formData.type} onChange={onChange} ></Form.Control>
                  </Col>
                  <Col>
                     <DatePicker placeholder='Fecha del evento' locale={es} name='date' selected={new Date(formData.date)} onChange={data => setFormData({ ...formData, date: data })} />
                  </Col>
               </Row>
            </Form.Group>
            <Form.Group>
               <Form.Control as='textarea' row='3' placeholder='Descripción del evento' type='text' name='detail' defaultValue={formData.detail} onChange={onChange} />
            </Form.Group>

            <Button type='submit' className='btn-submit' variant='primary'>
               {loading && <Spinner animation='border' size='sm' />} Actualizar
            </Button>
         </Form>
      </div>
   );
}

function initialValue(event) {
   return {
      userID: event.userID || '',
      name: event.name || '',
      detail: event.detail || '',
      date: event.date || '',
      type: event.type || '',
      photo: event.photo || ''
   }
}