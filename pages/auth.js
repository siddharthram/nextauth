import AuthForm from "../components/auth/auth-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useState } from 'react';
//import { useSession } from 'next-auth/react';


function AuthPage() {
 console.log("AUTH PAGE");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

 useEffect (()=> {
   getSession().then(session => {

  if (session ) {
    router.replace('/');
  } else {
    setIsLoading(false);
  }
});
},[router]);

if (isLoading) {
  return <p>Loading...</p>;
}

  return <AuthForm/>
}

//});

/*
  useEffect(() => {
  //const [isLoading, setIsLoading] = useState(true);
  const { status } = getSession({
    required: true,
    onUnauthenticated() {
      console.log("not authenticated");
      return <AuthForm />;
    }
  });
console.log("effecting");
  if (status === "loading") {
    console.log("loading");
    return <p> Loading...</p>;
  }
  if (status === "authenticated") {
    console.log("redirecting");
    router.replace("/");
  }

  if (status === "unauthenticated") {
    console.log("not authenticated");
  }
},[router]);
  

console.log("what??");
*/
  //ok user is logged in
 //
 

  /*    getSession().then({data:session,status} => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  },[router]); // routere is a dependency, though it will not change
 */

 // return <AuthForm />;

export default AuthPage;
