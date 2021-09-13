import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {createUser} from "../../redux/features/application";



function SignupPage() {
  const dispatch = useDispatch()
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const signingUp = useSelector(state => state.application.signingUp)
  const error = useSelector(state => state.application.error)

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(createUser(login, password))
  }

  return (
    <div>
      {error}
      <div>
        <input
          type="text"
          placeholder="type login"
          value={login}
          onChange={handleChangeLogin}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="type password"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
        <button onClick={handleSubmit} disabled={signingUp}>Регистрация</button>
    </div>
  );
}

export default SignupPage;
