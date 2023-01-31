import React from "react";
import { m } from "framer-motion";
import Header from "../../../components/Header";
import BreadCrumb from "../../../components/BreadCrumb";
import axios from "axios";
import Cookies from "universal-cookie";
import { useQuery } from "react-query";
import { MdWorkOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner";
import { container, item } from "../ClientsDashBoard/constants";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "./clientbatch.css";

const ClientPreScreenBatch = () => {
  const navigateTo = useNavigate();
  const cookies = new Cookies();
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  const token = cookies.get("token");
  const navigation = [
    { id: 0, name: "Dashboard", url: "/client/dashboard" },
    {
      id: 1,
      name: "Client Batch - Jobs",
      active: true,
    },
  ];

  const { data: jobsList, isFetching: jobFetching } = useQuery(
    ["jobs"],
    () =>
      axios.get("/api/job", {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          designation: item.designation,
          isActive: item.isActive,
          createdAt: dayjs(item.createdAt).format("llll"),
          id: item.id,
        }));
        return newData;
      },
    }
  );

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header home={"/client/dashboard"} logOut={"/client"} />
      <div className="client-batch">
        <div>
          <m.div className="title-text primary-color">
            Client Batch - Jobs
          </m.div>
        </div>
        <m.div className="client-filter-nav-header">
          <BreadCrumb items={navigation} />
        </m.div>
        {!jobFetching ? (
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            className="client-cards-main"
          >
            {jobsList.map((job) => (
              <m.div
                variants={item}
                key={job.id}
                className="client-each-card"
                onClick={() => {
                  const jobTitle = `${job.designation.replace("/", "-")}`
                    .replace(/\s+/g, "_")
                    .replace(/\./g, "");
                  navigateTo(`/client/batch/${job.id}/${jobTitle}`);
                }}
              >
                <div className="dash-card-icon">
                  <MdWorkOutline style={{ fontSize: "40px" }} />
                </div>
                <div className="client-inside-column">
                  <div className="bold medium-text">{job.designation}</div>
                  <div className="bold small-text">
                    {job.isActive ? (
                      <div className="text-green">Active</div>
                    ) : (
                      <div className="text-red">Inactive</div>
                    )}
                  </div>
                  <div className="very-small-text">{job.createdAt}</div>
                </div>
              </m.div>
            ))}
          </m.div>
        ) : (
          <div
            className="flex-center"
            style={{ minHeight: "40vh", alignItems: "center" }}
          >
            <Spinner />
          </div>
        )}
      </div>
    </m.div>
  );
};

export default ClientPreScreenBatch;
