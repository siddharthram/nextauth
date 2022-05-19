import { signOut, useSession } from 'next-auth/react';

import Link from 'next/link';

import classes from './main-navigation.module.css';



function MainNavigation() {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);

  function logoutHandler() {
    //signout returns a promise, but we dont care
    // since we are using useSession, screen will automatically update
    // when cookies are cleared
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && status !== "loading" && (
          <li>
            <Link href='/auth'>Login</Link>
          </li>
          )}
          {session && (
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          )}
          {session && (
          <li>
            <button onClick={logoutHandler}>Logout </button>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
