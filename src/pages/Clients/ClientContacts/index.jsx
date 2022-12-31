import React, { useEffect, useState } from "react";
import { m } from "framer-motion";
import Header from "../../../components/Header";
import Cookies from "universal-cookie";
import BreadCrumb from "../../../components/BreadCrumb";
import { container, item } from "../ClientsDashBoard/constants";
import { Button, message, Pagination, Table } from "antd";
import axios from "axios";
import "./clientcontacts.css";

const ClientContacts = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [name, setName] = useState("");
  const [data, setData] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    document.title = "Client - Job Openings";
    // getData(name, page);
  }, []);

  const navigation = [
    { id: 0, name: "Dashboard", url: "/client/dashboard" },
    {
      id: 1,
      name: "Job Openings",
      active: true,
    },
  ];

  const onChange = (page) => {
    setPage(page);
  };

  const getData = async (name, page) => {
    setLoading(true);
    let config = {
      headers: {
        Authorization: token,
      },
      params: {
        page: page,
        search: name,
      },
    };
    try {
      const Data = await axios.get(
        `/api/recruitment/client/contact?page=${page}`,
        config
      );
      if (Data.status === 200) {
        setLoading(false);
        setData(Data.data);
        setTotal(Data.data.TotalDisplay[0].total);
      } else {
        if (Data.status === 201) {
          message.error(Data.data.error);
          setLoading(false);
        } else {
          message.error("Ouch, Something Went Terribly Wrong!");
          setLoading(false);
        }
      }
    } catch (err) {
      message.error(err.response.data.error);
      setLoading(false);
      setData([]);
    }
  };

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
        className="client-contacts"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="title-text primary-color" variants={item}>
          Contacts
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
            loading={isLoading}
            pagination={false}
            rowKey={"id"}
          />
          <div className="pagination">
            <div className="pagination-total">{`Showing ${
              page === 1 ? 1 : page * 10 - 10 + 1
            } to ${page * 10 > total ? total : page * 10} of ${total}`}</div>
            <Pagination
              current={page}
              onChange={onChange}
              total={total}
              showSizeChanger={false}
            />
          </div>
        </m.div>
      </m.div>
    </m.div>
  );
};

export default ClientContacts;
