import React, { useState } from "react";
import SignInSingUp from './page/SignInSingUp'
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './utils/context';


export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={user}>
      { user ? <h1>Estas logeado</h1>  : <SignInSingUp /> }
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange />
    </AuthContext.Provider>
  );

}
