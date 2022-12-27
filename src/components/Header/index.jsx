import React from "react";
import ojimage from "../../images/oj-small.png";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Authentication from "../../components/Authentication";
import { FaHome, FaPowerOff } from "react-icons/fa";
import { removeCookie } from "../../utilities";
import { m } from "framer-motion";
import jwtDecode from "jwt-decode";
import "./header.css";

const Header = ({ home, logOut }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies?.get("token");
  const navigateTo = (path) => {
    navigate(path);
  };
  const user = token && jwtDecode(token);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      x: "120px",
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 9,
      },
    },
  };

  return (
    <div className="header">
      <Authentication />
      <m.div
        className="flex-small-gap"
        variants={container}
        animate="show"
        initial="hidden"
      >
        <m.div
          className="text-light-grey bolder mid-large-text white-color"
          variants={item}
        >{`Hi! ${user?.name}`}</m.div>
        <m.div
          className="hdr-icon-button"
          onClick={() => removeCookie(navigate, logOut)}
          variants={item}
        >
          <FaPowerOff />
        </m.div>
        <m.div
          className="hdr-icon-button"
          onClick={() => navigateTo(home)}
          variants={item}
        >
          <FaHome />
        </m.div>
      </m.div>
      <img
        src={ojimage}
        className="header-image"
        alt="Oman jobs"
        onClick={() => navigateTo(home)}
      />
    </div>
  );
};

export default Header;
