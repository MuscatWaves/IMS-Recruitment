import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import { cards, container, item } from "./constants";
import { Button } from "antd";
import "./DashBoard.css";

const RecruitmentDashBoard = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  useEffect(() => {
    document.title = "Dashboard - Recruitment";
    if (token) {
      try {
        var user = token && jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {}
    }
  }, [token]);

  return (
    <m.div
      className="recruitment-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header home={"/recruitment/dashboard"} logOut={"/recruitment"} />
      <AnimatePresence>
        <m.div
          className="cards-main"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {cards.map((card) => (
            <m.div className="cards-main__each" key={card.id} variants={item}>
              <img
                src={card.icon}
                className="cards-main__each-image"
                alt={card.title}
              />
              <Button
                type="primary"
                size="large"
                block
                onClick={() => navigateTo(card.path)}
                disabled={card.disabled}
              >
                {card.title}
              </Button>
            </m.div>
          ))}
        </m.div>
      </AnimatePresence>
    </m.div>
  );
};

export default RecruitmentDashBoard;
