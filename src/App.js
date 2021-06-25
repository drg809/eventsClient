import React, { useState, useEffect } from "react";
import SignInSingUp from './page/SignInSingUp'
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './utils/context';
import { isUserLogged } from './api/auth';
import Routing from './routers/Routing';


export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false)

  useEffect(() => {
    setUser(isUserLogged());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin]);

  if(!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      { user ? <Routing />  : <SignInSingUp setRefreshCheckLogin={setRefreshCheckLogin} /> }
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange />
    </AuthContext.Provider>
  );

}
