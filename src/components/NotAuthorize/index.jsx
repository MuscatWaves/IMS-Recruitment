import React, { useEffect } from "react";
import "../NoPageFound/page.css";
import { useNavigate } from "react-router-dom";
import Waves from "../Waves";

const NotAuthorize = () => {
  useEffect(() => {
    document.title = "Page not found";
  }, []);

  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="not-page-found">
      <div>Not Authorized</div>
      <div className="copyright text-light-grey slide-in-top-animation">
        @ 2022 Copyright Powered by Oman Jobs
      </div>
      <Waves />
    </div>
  );
};

export default NotAuthorize;
