import React, { useEffect, useState } from "react";
import { m } from "framer-motion";
import Header from "../../../components/Header";
import Cookies from "universal-cookie";
import BreadCrumb from "../../../components/BreadCrumb";
import { container, item } from "../ClientsDashBoard/constants";
import { Button, Input, message, Modal, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import { AiOutlineSearch } from "react-icons/ai";
import { useParams } from "react-router-dom";
import ClientCvBatchForm from "./clientcvbatchcreate";
import "./clientbatch.css";
import { removeUnderScore } from "../../../utilities";

const ClientCVBatch = () => {
  const params = useParams();
  const cookies = new Cookies();
  const token = cookies.get("token");
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, toggleModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deletionData, setDeletionData] = useState(null);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
  });

  useEffect(() => {
    document.title = `Client - CV Batch`;
    refetch(filter);
    // eslint-disable-next-line
  }, []);

  const refetch = (values) => {
    getData(values);
  };

  const navigation = [
    { id: 0, name: "Dashboard", url: "/client/dashboard" },
    { id: 1, name: "CV batch - Job Selection", url: "/client/batch/prescreen" },
    {
      id: 2,
      name: `CV Batch - ${removeUnderScore(params?.jobName)}`,
      active: true,
    },
  ];

  const statusList = [
    {
      label: "Accepted",
      value: 1,
    },
    {
      label: "Rejected",
      value: 2,
    },
  ];

  const getData = async (values, page) => {
    setLoading(true);
    setData([]);
    let config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const Data = await axios.get(
        `/api/batchclient?batchName=${values.search}&jobId=${params.jobId}`,
        config
      );
      if (Data.status === 200) {
        setLoading(false);
        setData(Data.data.data);
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
      title: "Candidate Name",
      render: (record) => <div className="text-grey">{record.CvName}</div>,
    },
    {
      title: "Batch Name",
      render: (record) => <div className="text-grey">{record.batchName}</div>,
    },
    {
      title: "CV Job",
      render: (record) => <div className="text-grey">{record.CvJob}</div>,
    },
    {
      title: "Job Position",
      render: (record) => (
        <div className="text-grey">{record.JobDesignation}</div>
      ),
    },
    {
      title: "Status",
      render: (record) => {
        if (record.status === 0)
          return <div className="text-orange">Pending</div>;
        if (record.status === 1)
          return <div className="text-green">Accepted</div>;
        if (record.status === 2)
          return <div className="text-red">Rejected</div>;
      },
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="flex-small-gap">
          <Button
            type="primary"
            onClick={() => {
              const name = `${record.CvName} ${record.CvJob.replace("/", "-")}`
                .replace(/\s+/g, "-")
                .replace(/\./g, "");
              window.open(`https://share.omanjobs.om/cv/${record.cv}/${name}`);
            }}
            ghost
          >
            <div className="bold">View CV Attached</div>
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
      width: "200px",
    },
  ];

  const deleteData = async () => {
    setDeleteLoading(true);
    await axios({
      method: "delete",
      url: `/api/batch/${deletionData.id}`,
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
        refetch(filter);
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
        <ClientCvBatchForm
          isModalOpen={isModalOpen}
          setModal={toggleModal}
          editData={editData}
          setEditData={setEditData}
          getData={refetch}
          filter={filter}
          statusList={statusList}
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
        <p>{`Are you sure you want to delete "${deletionData?.name}" from client data?`}</p>
      </Modal>
      <Header home={"/recruitment/dashboard"} logOut={"/recruitment"} />
      <m.div
        className="recruitment-contacts"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="title-text primary-color" variants={item}>
          CV Batch
        </m.div>
        <m.div
          className="recruitment-filter-nav-header-without"
          variants={item}
        >
          <BreadCrumb items={navigation} />
          <div className="flex-small-gap">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFilter({
                  ...filter,
                  search: name,
                });
                refetch({
                  search: name,
                });
              }}
            >
              <Input
                placeholder="Batch Name"
                prefix={<AiOutlineSearch className="large-text" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button className="hidden" htmlType="submit">
                Search
              </Button>
            </form>
          </div>
        </m.div>
        <m.div variants={item}>
          <Table
            dataSource={data}
            columns={columns}
            loading={isLoading}
            // pagination={false}
            rowKey={"id"}
          />
        </m.div>
      </m.div>
    </m.div>
  );
};

export default ClientCVBatch;
