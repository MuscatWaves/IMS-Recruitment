import React, { useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import "./clientjobopenings.css";
import BreadCrumb from "../../../components/BreadCrumb";
import { container, item } from "../ClientsDashBoard/constants";
import { Button, Table } from "antd";

const ClientJobOpenings = () => {
  useEffect(() => {
    document.title = "Client - Job Openings";
  }, []);

  const navigation = [
    { id: 0, name: "Dashboard", url: "/client/dashboard" },
    {
      id: 1,
      name: "Job Openings",
      active: true,
    },
  ];

  const test_data = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      contact_no: "997722002",
      industry: "IT Sector",
    },
    {
      id: 2,
      name: "Maxwell Paris",
      email: "maxwellParis@gmail.com",
      contact_no: "988123321",
      industry: "Oil & Gas Sector",
    },
  ];

  const columns = [
    {
      title: "Client Name",
      render: (record) => (
        <div>
          <div className="text-black bolder">{record.name}</div>
          <div className="small-text text-grey">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Contact No",
      render: (record) => (
        <div className="text-grey bold">{record.contact_no}</div>
      ),
    },
    {
      title: "Industry",
      render: (record) => (
        <div className="text-grey bold">{record.industry}</div>
      ),
    },
  ];

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header home={"/client/dashboard"} logOut={"/client"} />
      <m.div
        className="client-job-openings"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="title-text primary-color" variants={item}>
          Job Openings
        </m.div>
        <m.div className="client-filter-nav-header" variants={item}>
          <BreadCrumb items={navigation} />
          <Button type="primary" size="large">
            + Create
          </Button>
        </m.div>
        <m.div variants={item}>
          <Table
            dataSource={test_data}
            columns={columns}
            // loading={isFetching}
            pagination={false}
            rowKey={"id"}
          />
        </m.div>
      </m.div>
    </m.div>
  );
};

export default ClientJobOpenings;
