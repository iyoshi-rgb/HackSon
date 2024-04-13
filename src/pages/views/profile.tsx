import React from "react";
import { Logout } from "../../utils/logout";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Logout();
    navigate("/");
  };
  return (
    <div>
      profile
      <button onClick={handleLogout} className="btn btn-neutral">
        Logout
      </button>
    </div>
  );
};
