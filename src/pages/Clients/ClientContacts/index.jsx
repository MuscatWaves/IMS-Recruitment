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
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    document.title = "Client - Contacts";
    getData(name, page);
    // eslint-disable-next-line
  }, []);

  const navigation = [
    { id: 0, name: "Dashboard", url: "/client/dashboard" },
    {
      id: 1,
      name: "Contacts",
      active: true,
    },
  ];

  const onChange = (page) => {
    setPage(page);
  };

  const getData = async (name, page) => {
    setLoading(true);
    setData([]);
    let config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const Data = await axios.get(
        `/api/recruitment/client/contact?page=${page}`,
        config
      );
      if (Data.status === 200) {
        setLoading(false);
        setData(Data.data.data);
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
      console.log(err);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Client Name",
      render: (record) => (
        <div>
          <div className="text-black bold">{record.name}</div>
          <div className="very-small-text text-grey bold">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Contact No",
      render: (record) => <div className="text-grey">{record.number}</div>,
    },
    {
      title: "Job",
      render: (record) => (
        <div>
          <div className="text-black bold">{record.jobtitle}</div>
          <div className="very-small-text text-grey bold">
            {record.department}
          </div>
        </div>
      ),
    },
    {
      title: "Client",
      render: (record) => <div className="text-grey">{record.client}</div>,
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
            dataSource={data}
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
