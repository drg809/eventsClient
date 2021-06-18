import React, { useState } from "react";
import SignInSingUp from './page/SignInSingUp'
import { ToastContainer } from 'react-toastify';


export default function App() {
  const [user, setUser] = useState({name:"Dani"});

  return (
    <div>
      { user ? <SignInSingUp /> : <h1>No estas logeado</h1> }
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange />
    </div>
  );

}
