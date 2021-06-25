/* eslint-disable import/no-anonymous-default-export */
import Home from '../page/Home/Home';
import User from '../page/User/User';
import Error404 from '../page/Error404/Error404';

export default [
   {
      path: '/profile/:id',
      exact: true,
      page: User
   },
   {
      path: '/',
      exact: true,
      page: Home
   },
   {
      path: '*',
      page: Error404
   }
]