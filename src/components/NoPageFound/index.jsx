import React, { useEffect } from "react";
import Waves from "../Waves";
import { useNavigate } from "react-router-dom";
import "./page.css";

const PageNotFound = () => {
  const navigateTo = useNavigate();
  useEffect(() => {
    document.title = "Page not found";
  }, []);

  return (
    <div className="not-page-found">
      <div>No Page Found as such</div>
      <div className="copyright text-light-grey slide-in-top-animation">
        @ 2022 Copyright Powered by Oman Jobs
      </div>
      <Waves />
    </div>
  );
};

export default PageNotFound;
