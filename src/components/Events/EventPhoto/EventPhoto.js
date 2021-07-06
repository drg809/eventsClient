import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import useAuth from '../../../hooks/useAuth';
import { API_HOST } from '../../../utils/constant';
import { checkParticipationApi } from '../../../api/participarte';
import ParticipateModal from '../../Modal/Participations/ParticipateModal';
import ParticipateForm from '../Participation/ParticipateForm/ParticipateForm';
import CancelForm from '../Participation/CancelForm/CancelForm';

import './EventPhoto.scss';

export default function EventPhoto(props) {
   const { event } = props;
   const [showPartModal, setShowPartModal] = useState(false);
   const [showCancelModal, setShowCancelModal] = useState(false);
   const [participation, setParticipation] = useState(null);
   const [reloadParticipation, setReloadParticipation] = useState(false);
   const photoUrl = event?.photo ? `${API_HOST}/events/photo?id=${event._id}` : null;
   const loggedUser = useAuth();

   useEffect(() => {
      if (event) {
         checkParticipationApi(event._id).then(response => {
            response?.status ? setParticipation(true) : setParticipation(false);
         });
      }
      setReloadParticipation(false);
   }, [event, reloadParticipation]);

   return (
      <div className='banner-avatar' style={{ backgroundImage: `url(${photoUrl})` }}>
         {event && (
            <div className='options'>
               {participation !== null && (
                  (participation ? <Button onClick={() => setShowCancelModal(true)} className='participate' > <span>Participando</span> </Button> : <Button onClick={() => setShowPartModal(true)} >Participar</Button>)
               )}
            </div>
         )}

         <ParticipateModal show={showPartModal} setShowModal={setShowPartModal} title='Participar' >
            <ParticipateForm loggedUser={loggedUser} event={event} setShowModal={setShowPartModal} />
         </ParticipateModal>

         <ParticipateModal show={showCancelModal} setShowModal={setShowCancelModal} title='Participar' >
            <CancelForm loggedUser={loggedUser} event={event} setShowModal={setShowCancelModal} />
         </ParticipateModal>
      </div>
   );
}
