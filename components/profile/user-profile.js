import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { getSession } from 'next-auth/react';
import { useEffect, useState} from 'react';



function UserProfile() {
 // const [isLoading, setIsLoading] = useState(true);
  // Redirect away if NOT auth
/*   useEffect(() => {
  getSession().then((session, status) => {
    setIsLoading(false);
    if (!session){
      window.location.href="/auth";
      } else {
        setIsLoading(false);
      }
    });
  },[]);

    if (isLoading) {
      return <p className={classes.profile}>Loading...</p>;
    }   */  
    
    async function passwordHandler(passwordData) {
      console.log("passwordhandler");
     const response = await fetch('/api/user/change-password', {
        method: "PATCH",
        body: JSON.stringify(passwordData),
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log ("response is", response);
      const data = await response.json();
      console.log(data);

    }
      return (
        <section className={classes.profile}>
          <h1>Your User Profile</h1>
          <ProfileForm onChangedPassword={passwordHandler} />
        </section>
      );
}

export default UserProfile;
