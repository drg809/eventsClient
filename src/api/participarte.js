import { API_HOST } from '../utils/constant';
import { getTokenApi } from './auth';

export function checkParticipationApi(eventID) {
   const url = `${API_HOST}/participations/user?eventId=${eventID}`;

   const params = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`
      }
   };

   return fetch(url, params).then(response => {
      return response.json();
   })
   .then(result => {
      return result;
   })
   .catch(err => {
      return err;
   });
}

export function participateEventApi(eventID, data) {
   const url = `${API_HOST}/participations?eventId=${eventID}`;

   const params = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`
      },
      body: JSON.stringify(data)
   };

   return fetch(url, params).then(response => {
      if (response.status >= 200 && response.status < 300) {
         return {code: response.status, message: 'Enhorabuena, ¡participaste en el evento!.'};
      }
      return {code: 500, message: 'Error del servidor.'};
   }).catch(err => {
      return err;
   });
}