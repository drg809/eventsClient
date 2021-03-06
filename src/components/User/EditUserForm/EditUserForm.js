import React, { useState, useCallback } from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { API_HOST } from '../../../utils/constant';
import { CameraIcon } from '../../../utils/Icons';
import { uploadBannerAvatarApi, updateInfoApi } from '../../../api/user';

import './EditUserForm.scss';

export default function EditUserForm(props) {
   const { user, setShowModal } = props;
   const [formData, setFormData] = useState(initialValue(user));
   const [bannerUrl, setBannerUrl] = useState(
      user?.banner ? `${API_HOST}/users/banner?id=${user.id}` : null
   );
   const [bannerFile, setBannerFile] = useState(null);
   const [avatarUrl, setAvatarUrl] = useState(
      user?.avatar ? `${API_HOST}/users/avatar?id=${user.id}` : null
   );
   const [avatarFile, setAvatarFile] = useState(null);
   const [loading, setLoading] = useState(false);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const onDropBanner = useCallback(acceptedFile => {
      const file = acceptedFile[0];
      setBannerUrl(URL.createObjectURL(file));
      setBannerFile(file);
   });
   const { getRootProps: getRootBannerProps, getInputProps: getInputBannerProps } = useDropzone({
      accept: ['image/jpeg', 'image/png'],
      noKeyboard: true,
      multiple: false,
      onDrop: onDropBanner
   });

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const onDropAvatar = useCallback(acceptedFile => {
      const file = acceptedFile[0];
      setAvatarUrl(URL.createObjectURL(file));
      setAvatarFile(file);
   });

   const { getRootProps: getRootAvatarProps, getInputProps: getInputAvatarProps } = useDropzone({
      accept: ['image/jpeg', 'image/png'],
      noKeyboard: true,
      multiple: false,
      onDrop: onDropAvatar
   })

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onSubmit = async e => {
      e.preventDefault();
      setLoading(true);
      if (bannerFile) {
         await uploadBannerAvatarApi(bannerFile, 'banner').catch(() => {
            toast.error('Error al subir el banner al servidor');
         })
      };
      if (avatarFile) {
         await uploadBannerAvatarApi(avatarFile, 'avatar').catch(() => {
            toast.error('Error al subir el avatar al servidor');
         })
      };
      await updateInfoApi(formData).then(() => {
         setShowModal(false);
      }).catch(() => {
         toast.error('Error al actualizar los datos.')
      });
      setLoading(false);
      window.location.reload();
   };

   return (
      <div className='edit-user-form'>
         <div className='banner' style={{ backgroundImage: `url(${bannerUrl})` }} {...getRootBannerProps()} >
            <input {...getInputBannerProps()} />
            <CameraIcon />
         </div>
         <div className='avatar' style={{ backgroundImage: `url(${avatarUrl})` }} {...getRootAvatarProps()} >
            <input {...getInputAvatarProps()} />
            <CameraIcon />
         </div>
         <Form onSubmit={onSubmit} >
            <Form.Group>
               <Row>
                  <Col>
                     <Form.Control type='text' placeholder='Nombre' name='name' defaultValue={formData.name} onChange={onChange} />
                  </Col>
                  <Col>
                     <Form.Control type='text' placeholder='Apellido' name='surname' defaultValue={formData.surname} onChange={onChange} />
                  </Col>
               </Row>
            </Form.Group>
            <Form.Group>
               <Form.Control as='textarea' row='3' placeholder='Agrega tu biograf??a' type='text' name='bio' defaultValue={formData.bio} onChange={onChange} />
            </Form.Group>
            <Form.Group>
               <Form.Control type='text' placeholder='Sitio web' name='web' defaultValue={formData.web} onChange={onChange} />
            </Form.Group>
            <Form.Group>
               <DatePicker placeholder='Fecha de nacimiento' locale={es} name='date' selected={new Date(formData.date)} onChange={data => setFormData({ ...formData, date: data })} />
            </Form.Group>

            <Button type='submit' className='btn-submit' variant='primary'>
               {loading && <Spinner animation='border' size='sm' />} Actualizar
            </Button>
         </Form>
      </div>
   );
}

function initialValue(user) {
   return {
      name: user.name || '',
      surname: user.surname || '',
      bio: user.bio || '',
      web: user.web || '',
      date: user.date || '',
      location: user.location || ''
   }
}