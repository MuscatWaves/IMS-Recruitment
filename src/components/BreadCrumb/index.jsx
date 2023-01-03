import React from "react";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./breadcrumb.css";

const BreadCrumb = ({ items }) => {
  const navigateTo = useNavigate();
  return (
    <div className="breadcrumb-tt-main">
      {items.map((item) => (
        <div key={item.id}>
          <div className="breadcrumb-tt-main">
            {item.id !== 0 && (
              <AiFillCaretRight
                className="breadcrumb-tt-main__caret-right"
                style={
                  item.active
                    ? { color: "var(--orange-color)" }
                    : { color: "var(--primary-color)" }
                }
              />
            )}
            {item.id !== 0 && (
              <AiFillCaretDown
                className="breadcrumb-tt-main__caret-down"
                style={
                  item.active
                    ? { color: "var(--orange-color)" }
                    : { color: "var(--primary-color)" }
                }
              />
            )}
            <div
              className={
                item.active
                  ? "bolder text-orange"
                  : "bolder primary-color pointer"
              }
              onClick={() => navigateTo(item.url)}
            >
              {item.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
