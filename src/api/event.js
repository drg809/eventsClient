import { API_HOST } from '../utils/constant';
import { getTokenApi } from './auth';

// export function getUserApi(id) {
//    const url = `${API_HOST}/users/profile?id=${id}`;

//    const params = {
//       method: 'GET',
//       headers: {
//          'Content-Type': 'application/json',
//          Authorization: `Bearer ${getTokenApi()}`
//       }
//    }

//    return fetch(url, params).then(response => {
//       // eslint-disable-next-line no-throw-literal
//       if(response.status >= 400) throw null
//       return response.json();
//    })
//    .then(result => {
//       return result;
//    })
//    .catch(err => {
//       return err;
//    })
// }

export function uploadEventPhotoApi(file) {
   const url = `${API_HOST}/events/photo`;

   const data = new FormData();
   data.append('photo', file);

   const params = {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${getTokenApi()}`
      },
      body: data
   }

   return fetch(url, params).then(response => {
      return response.json();
   }).then(result => {
      return result;
   }).catch(err => {
      return err;
   });
}

export function createEventApi(data) {
   const url = `${API_HOST}/events`;

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
         return {code: response.status, message: 'Evento creado.'};
      }
      return {code: 500, message: 'Error del servidor.'};
   }).catch(err => {
      return err;
   });
}

export function updateEventApi(data) {
   const url = `${API_HOST}/events`;

   const params = {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`
      },
      body: JSON.stringify(data)
   };

   return fetch(url, params).then(response => {
      return response;
   }).catch(err => {
      return err;
   });
}

export function getUsetEventsApi(userID, page) {
   const url = `${API_HOST}/events/user?id=${userID}&page=${page}`;

   const params = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`
      }
   };

   return fetch(url, params).then(response => {
      return response.json();
   }).catch(err => {
      return err;
   });
}

export function getEventsFollowerApi(page = 1) {
   const url = `${API_HOST}/events/follow?page=${page}`;

   const params = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`
      }
   };

   return fetch(url, params).then(response => {
      return response.json();
   }).catch(err => {
      return err;
   });

}