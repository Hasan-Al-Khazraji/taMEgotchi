import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="scale-250 absolute bottom-0 right-0 mr-20 mb-14">
      <button
        className="bg-red-400 rounded-lg p-2 hover:bg-red-500 hover:scale-110 transform transition duration-100"
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        <LogoutIcon></LogoutIcon>
      </button>
      <h1 className="text-black text-xs scale-75">Logout</h1>
    </div>
  );
};

export default LogoutButton;