import { API_HOST, TOKEN_KEY } from "../utils/constant";

export function signUpApi(user) {
   const url = `${API_HOST}/signIn`;
   const userTemp = {
      ...user,
      email: user.email.toLowerCase(),
      date: new Date()
   };
   delete userTemp.repeatPassword;

   const params = {
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(userTemp)
   };

   return fetch(url, params).then(response => {
      if(response.status >= 200 && response.status < 300) {
         return response.json();
      }
      return { code: 404, message: "Email no disponible" }
   }).then( result => {
      return result;
   })
   .catch(err => {
      return err;
   })
}

export function singInApi(user) {
   const url = `${API_HOST}/login`;

   const data = {
      ...user,
      email: user.email.toLowerCase()
   };

   const params = {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
   };

   return fetch(url, params).then(response => {
      if (response.status >= 200 && response.status < 300) {
         return response.json();
      }
      return { message: 'Usuario o contraseña incorrectos.' }
   }).then(result => {
      return result;
   })
   .catch(err => {
      return err;
   })
}

export function setTokenApi(token) {
   localStorage.setItem(TOKEN_KEY, token);
}