import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

function LoginForm() {

  let history = useHistory();

  const rootUser = {
    login: "root",
    cadastroUnico: "root"
  }

  const [user, setUser] = useState({
    login: '',
    cadastroUnico: '',
  });

  const [warning, setWarning] = useState('');

  const [disableButton, setDisableButton] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({...user, [name]: value});
  };

  useEffect(() => {
    const validateUser = () => Object.values(user).every((value) => value !== '');
    if (validateUser()) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const twoSeconds = 2000;

    if (Object.keys(user).every(key => user[key] === rootUser[key])) {
      history.push("/customers");
    } else {
      setWarning("Credenciais incorretas");
      setTimeout(() => setWarning(''), twoSeconds);
    }

    setUser({
      login: '',
      cadastroUnico: '',
    });
  };

  return (
    <div >
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="login"
          placeholder="Login"
          onChange={handleChange}
          value={user.login}
          />
        <input
          type="text"
          name="cadastroUnico"
          onChange={handleChange}
          value={user.cadastroUnico}
          placeholder="Numero de cadastro unico"
          />
        <button disabled={disableButton} type="submit">Login</button>
      </form>
      <div
          className={ warning !== '' ? 'error' : '' }
          visible={ warning === 'true'? 'true' : 'false' }
        >
          <div>{warning}</div>
        </div>
    </div>
  )
}

export default LoginForm;