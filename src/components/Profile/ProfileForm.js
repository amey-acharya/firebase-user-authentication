import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const inputPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory()

  const changePasswordHandler = (event) => {
    event.preventDefault();
    const idToken = authCtx.token
    const password = inputPasswordRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCP3zVThrh0BRdpwzushWk4okisz63LJd0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idToken: idToken,
        password: password,
        returnSecureToken: true
      })
    }).then(res => {
      history.replace('/')
    })
  };

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={inputPasswordRef} minLength='7'/>
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
