import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import useAuth from '../../../hooks/useAuth';
import { API_HOST } from '../../../utils/constant';
import { checkParticipationApi } from '../../../api/participarte';

import './EventPhoto.scss';

export default function EventPhoto(props) {
   const { event } = props;
   const [showModal, setShowModal] = useState(false);
   const [participation, setParticipation] = useState(null);
   const [reloadFollow, setReloadFollow] = useState(false);
   const photoUrl = event?.photo ? `${API_HOST}/events/photo?id=${event._id}` : null;
   const loggedUser = useAuth();
   console.log(props);

   useEffect(() => {
      if (event) {
         checkParticipationApi(event._id).then(response => {
            response?.status ? setParticipation(true) : setParticipation(false);
         });
      }
      setReloadFollow(false);
   }, [event, reloadFollow]);

   const onParticipate = () => {
      // unFollowUserApi(event.id).then(() => {
      //    setReloadFollow(true);
      // });
   };

   return (
      <div className='banner-avatar' style={{ backgroundImage: `url(${photoUrl})` }}>
         {event && (
            <div className='options'>
               {participation !== null && (
                  (participation ? <Button onClick={onParticipate} className='participate' > <span>Participando</span> </Button> : <Button >Participar</Button>)
               )}
            </div>
         )}

         {/* <ConfigModal show={showModal} setShow={setShowModal} title='Editar Perfil' >
            <EditUserForm loggedUser={loggedUser} event={event} setShowModal={setShowModal} />
         </ConfigModal> */}
      </div>
   );
}
