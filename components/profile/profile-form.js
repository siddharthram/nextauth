import classes from './profile-form.module.css';
import { useRef } from 'react';

function ProfileForm(props) {

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  

  function submitHandler(event) {
    event.preventDefault();
    const entryOldPassword = oldPasswordRef.current.value;
    const entryNewPassword = newPasswordRef.current.value;
    console.log("Submit Handler");
    console.log(entryNewPassword, entryOldPassword);

    //do client side validation

    // call the function on the user profile that actually
    // call the api
    props.onChangedPassword({
      oldPassword: entryOldPassword,
      newPassword: entryNewPassword
    });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler} >
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
