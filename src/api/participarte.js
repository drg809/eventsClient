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