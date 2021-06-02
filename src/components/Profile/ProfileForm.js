import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import authContext from '../../store/auth-context';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(authContext);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPassword = newPasswordInputRef.current.value;

    try {
      const respons = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAANsK30Jnp4KQLwvcXIVl-HoQQ0gZ_Rj4',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: authCtx.token,
            password: newPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (respons.ok) {
        console.log('RESONSE OK');
        history.replace('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
