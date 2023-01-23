import React, { useEffect, useState } from "react";
import { m } from "framer-motion";
import Header from "../../../components/Header";
import Cookies from "universal-cookie";
import BreadCrumb from "../../../components/BreadCrumb";
import { container, item } from "../ClientsDashBoard/constants";
import { Button, Input, message, Modal, Pagination, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import ClientJobForm from "./clientjobcreate";
import "./clientjobopenings.css";
import JdViewData from "./JdViewData";
import { useQuery } from "react-query";
import dayjs from "dayjs";

const ClientJobOpenings = () => {
  const cookies = new Cookies();
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  const token = cookies.get("token");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDetailsData, setShowDetailsData] = useState({});
  const [isModalOpen, toggleModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deletionData, setDeletionData] = useState(null);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    document.title = "Client - Job Openings";
    refetch();
    // eslint-disable-next-line
  }, []);

  const refetch = () => {
    getData(name, page);
  };

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
    getData(name, page);
  };

  const { data: contactResult } = useQuery(
    ["contactResult"],
    () =>
      axios.get("/api/recruitment/client/contact", {
        headers: {
          Authorization: token,
        },
      }),
    {
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        return newData;
      },
    }
  );

  const getData = async (name, page) => {
    setLoading(true);
    setData([]);
    let config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const Data = await axios.get(`/api/job?page=${page}`, config);
      if (Data.status === 200) {
        setLoading(false);
        setData(Data.data.data);
        setTotal(Data.data.TotalDisplay);
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
      title: "Job Title",
      render: (record) => <div className="text-grey">{record.designation}</div>,
    },
    {
      title: "Contact",
      render: (record) => (
        <div className="text-grey">
          {
            contactResult?.filter((item) => item.value === record.contact)[0]
              ?.label
          }
        </div>
      ),
    },
    {
      title: "Created By",
      render: (record) => (
        <div>
          <div className="text-black">{record.createdBy}</div>
          <div className="very-small-text">
            {dayjs(record.createdAt).format("llll")}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      render: (record) =>
        record.isActive ? (
          <div className="text-green">Active</div>
        ) : (
          <div className="text-red">Inactive</div>
        ),
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="flex-small-gap">
          <Button
            type="primary"
            onClick={() => {
              setShowDetailsData(record);
              setShowDetailsModal(true);
            }}
            ghost
          >
            <div className="bold">View Job Description</div>
          </Button>
          <Button
            type="primary"
            shape="round"
            icon={<EditOutlined />}
            onClick={() => {
              setEditData(record);
              toggleModal(true);
            }}
          />
        </div>
      ),
      width: "300px",
    },
  ];

  const deleteData = async () => {
    setDeleteLoading(true);
    await axios({
      method: "delete",
      url: `/api/job/${deletionData.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    })
      .then(function (response) {
        message.success("The data has been sucessfully deleted");
        toggleDeleteModal(false);
        setDeletionData("");
        refetch();
        setDeleteLoading(false);
      })
      .catch(function (response) {
        message.error("Something Went Wrong!", "error");
        setDeleteLoading(false);
      });
  };

  const handleCancel = () => {
    toggleDeleteModal(false);
    setDeleteLoading(false);
    setDeletionData(null);
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {isModalOpen && (
        <ClientJobForm
          isModalOpen={isModalOpen}
          setModal={toggleModal}
          editData={editData}
          setEditData={setEditData}
          getData={refetch}
        />
      )}
      {showDetailsModal && (
        <JdViewData
          open={showDetailsModal}
          setOpen={setShowDetailsModal}
          data={showDetailsData}
          setData={setShowDetailsData}
        />
      )}
      <Modal
        title="Delete Confirmation"
        open={deleteModal}
        onOk={deleteData}
        onCancel={handleCancel}
        okText={"Delete"}
        okType={"danger"}
        confirmLoading={deleteLoading}
      >
        <p>{`Are you sure you want to delete "${deletionData?.designation}" from job data?`}</p>
      </Modal>
      <Header home={"/client/dashboard"} logOut={"/client"} />
      <m.div
        className="client-contacts"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="title-text primary-color" variants={item}>
          Job Openings
        </m.div>
        <m.div className="client-filter-nav-header" variants={item}>
          <BreadCrumb items={navigation} />
          <div className="flex-small-gap">
            <form
              className="hidden"
              onSubmit={(e) => {
                e.preventDefault();
                console.log(name);
              }}
            >
              <Input
                placeholder="Search here!"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button className="hidden" htmlType="submit">
                Search
              </Button>
            </form>
            <Button
              type="primary"
              onClick={() => {
                setEditData(null);
                toggleModal(true);
              }}
            >
              + Create Job
            </Button>
          </div>
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

export default ClientJobOpenings;
