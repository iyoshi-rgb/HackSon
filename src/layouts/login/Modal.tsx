import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingAndRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile"); //profileへリダイレクト
    }, 2000); //

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default LoadingAndRedirect;
