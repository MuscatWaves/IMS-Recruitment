import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import { cards, container, item } from "./constants";
import { Tour } from "antd";
import "./DashBoard.css";

const ClientDashBoard = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  const user = token && jwtDecode(token);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const steps = [
    {
      title: "Upload File",
      description: "Put your files here.",
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: "Save",
      description: "Save your changes.",
      target: () => ref2.current,
    },
    {
      title: "Other Actions",
      description: "Click to see other actions.",
      target: () => ref3.current,
    },
  ];

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
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      <AnimatePresence>
        <m.div
          className="cards-main"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {cards([ref1, ref2]).map(
            (card) =>
              !card.disabled && (
                <m.div
                  className="cards-main__each"
                  key={card.id}
                  onClick={() => navigateTo(card.path)}
                  variants={item}
                  ref={card?.ref}
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
