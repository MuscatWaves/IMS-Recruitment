import React from "react";
import ojimage from "../../images/oj-small.png";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Authentication from "../../components/Authentication";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { removeCookie } from "../../utilities";
import jwtDecode from "jwt-decode";
import "./header.css";
import { Button } from "antd";

const Header = ({ home, logOut }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies?.get("token");
  const navigateTo = (path) => {
    navigate(path);
  };
  const user = token && jwtDecode(token);

  // const container = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //     },
  //   },
  // };

  // const item = {
  //   hidden: {
  //     opacity: 0,
  //     x: "120px",
  //   },
  //   show: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       type: "spring",
  //       stiffness: 40,
  //       damping: 9,
  //     },
  //   },
  // };

  return (
    <div className="header">
      <Authentication />
      <img
        src={ojimage}
        className="header-image"
        alt="Oman jobs"
        onClick={() => navigateTo(home)}
      />
      <div className="flex-small-gap">
        <FiUser className="large-text text-light-grey" />
        <div className="text-light-grey bolder">{user ? user?.name : ""}</div>
        <Button
          className="header-log-out-btn"
          type="primary"
          danger
          onClick={() => removeCookie(navigate, logOut)}
          shape={"round"}
          title={"Log Off"}
        >
          <AiOutlinePoweroff className="large-text" />
        </Button>
      </div>
      {/* <m.div
        className="flex-gap"
        variants={container}
        animate="show"
        initial="hidden"
      >
        <m.div
          className="mid-large-text white-color"
          variants={item}
        >{`Hi! ${user?.name}`}</m.div>
        <div className="flex-small-gap">
          <m.div
            className="hdr-icon-button"
            onClick={() => removeCookie(navigate, logOut)}
            variants={item}
          >
            <FaPowerOff />
          </m.div>
        </div>
      </m.div> */}
    </div>
  );
};

export default Header;
