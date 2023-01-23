import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import { cards, container, item } from "./constants";
import "./DashBoard.css";

const ClientDashBoard = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  const user = token && jwtDecode(token);

  useEffect(() => {
    document.title = "Dashboard";
    if (token) {
      try {
        var user = token && jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {}
    }
  }, [token]);

  return (
    <m.div
      className="client-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header home={"/client/dashboard"} logOut={"/client"} />
      <m.span className="welcome-message">
        <h1 className="text-orange bold">Welcome</h1>
        <h1 className="text-grey">{user?.name}!</h1>
      </m.span>
      <AnimatePresence>
        <m.div
          className="cards-main"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {cards.map(
            (card) =>
              !card.disabled && (
                <m.div
                  className="cards-main__each"
                  key={card.id}
                  onClick={() => navigateTo(card.path)}
                  variants={item}
                >
                  <div className="dash-card-icon">
                    <card.icon style={{ fontSize: "40px" }} />
                  </div>
                  <div>
                    <h2>{card.title}</h2>
                    <p className="small-text">{card.description}</p>
                  </div>
                  <div className="go-corner" href="#">
                    <div className="go-arrow">→</div>
                  </div>
                </m.div>
              )
          )}
        </m.div>
      </AnimatePresence>
      {/* <Footer /> */}
    </m.div>
  );
};

export default ClientDashBoard;
