import React, { useEffect } from "react";
import { Result, Button } from "antd";
import Waves from "../Waves";
import { useNavigate } from "react-router-dom";
import "./page.css";
import Footer from "../Footer";

const PageNotFound = () => {
  const navigateTo = useNavigate();
  useEffect(() => {
    document.title = "Page not found";
  }, []);

  return (
    <div className="not-page-found">
      <Result
        className="zoom-in-animation"
        status="404"
        title={
          <div className="bolder" style={{ fontSize: "44px" }}>
            {"404"}
          </div>
        }
        subTitle={
          <div className="medium-text bold">
            {"Sorry, the page you visited does not exist."}
          </div>
        }
        extra={
          <Button type="primary" onClick={() => navigateTo("/")} size={"large"}>
            Back To Login
          </Button>
        }
      />
      <Footer />
      <Waves />
    </div>
  );
};

export default PageNotFound;
