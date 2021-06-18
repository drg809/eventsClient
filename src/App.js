import React, { useState } from "react";
import SignInSingUp from './page/SignInSingUp'

export default function App() {
  const [user, setUser] = useState({name:"Dani"});

  return <div>{ user ? <SignInSingUp /> : <h1>No estas logeado</h1> }</div>;
}
