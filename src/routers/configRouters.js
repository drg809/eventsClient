/* eslint-disable import/no-anonymous-default-export */
import Home from '../page/Home/Home';
import User from '../page/User/User';
import CreateEvents from '../page/Events/CreateEvents/CreateEvents';
import Error404 from '../page/Error404/Error404';

export default [
   {
      path: '/profile/:id',
      exact: true,
      page: User
   },
   {
      path: '/events/create',
      exact: true,
      page: CreateEvents
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