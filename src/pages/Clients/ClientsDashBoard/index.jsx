import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import { cards, container, item } from "./constants";
import { Tour } from "antd";
import ojimage from "../../../images/oj-small.png";
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
  const uploadFileTabRef = useRef(null);
  const cvBatchTabRef = useRef(null);

  const steps = [
    {
      title: "Welcome to Muscat Waves Client Portal",
      description:
        "This is the portal you would be using for posting the jobs & viewing your CV Batches.",
      cover: (
        <img alt="tour.png" src={ojimage} width={"100px"} height={"500px"} />
      ),
    },
    {
      title: "Job Openings",
      description:
        "This tab is used for creating & viewing your job posting, Here you can create the Job Description which will help our Recruiters to find you the best possible candidate fit for the job.",
      target: () => uploadFileTabRef.current,
      // target: () => cvBatchTabRef.current,
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
          {cards([uploadFileTabRef, cvBatchTabRef]).map(
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
