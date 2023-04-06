import React, { useState } from "react";
import "../../styles/form.css"
import { login } from "../../api/authentification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons"
import {  useNavigate } from "react-router-dom";

interface LoginFormProps {
  setToken: (name: string) => void
}

const LoginForm = ( {setToken}: LoginFormProps ) => {
  const initialState = {
    login: "",
    password: "",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("")

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({...formValues, [event.target.name]: event.target.value})
  }

  const submit = async () => {
    const res = await login(formValues.login, formValues.password)
    if (res.success) {
      setToken(res.access_token as string)
      navigate("/admin")
    } else {
      setErrorMessage(res.error as string)
      setTimeout(() => {
        setErrorMessage("")
      }, 2000)
    }
  }

  return (
    <>
      <div className="login-form">
        <h1>Connexion</h1>
        <input
          name='login'
          id='login'
          type='text'
          placeholder='Identifiant'
          onChange={onChange}
          required
          />
        <input
          name='password'
          id='password'
          type='password'
          placeholder='Mot de passe'
          onChange={onChange}
          required
          />
          <button onClick={submit} className="btn btn-filled create-btn">Connexion</button>
        {<div className={`error-message ${errorMessage ? 'show' : ""}`}><FontAwesomeIcon icon={faXmarkCircle}/><p>{errorMessage}</p></div>}
      </div>
    </>
  )
}

export default LoginForm