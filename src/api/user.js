import { API_HOST } from '../utils/constant';
import { getTokenApi } from './auth';

export function getUserApi(id) {
   const url = `${API_HOST}/users/profile?id=${id}`;

   const params = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`
      }
   }

   return fetch(url, params).then(response => {
      // eslint-disable-next-line no-throw-literal
      if(response.status >= 400) throw null
      return response.json();
   })
   .then(result => {
      return result;
   })
   .catch(err => {
      return err;
   })
}

export function uploadBannerAvatarApi(file, type) {
   const url = `${API_HOST}/users/${type}`;

   const data = new FormData();
   data.append(`${type}`, file);

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

export function updateInfoApi(data) {
   const url = `${API_HOST}/users/profile`;

   const params = {
      method: 'PUT',
      headers: {
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