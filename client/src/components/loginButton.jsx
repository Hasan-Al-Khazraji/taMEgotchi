import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const {user, loginWithRedirect } = useAuth0();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!user) {
      loginWithRedirect();
    }
    else {
      const email = user.email;
      await fetch('http://localhost:5000/loggedIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      })
      .catch(error => console.error('Error:', error));
      loginWithRedirect();
    };
    }

  return <button onClick={handleClick}>Log In</button>;
};

export default LoginButton;