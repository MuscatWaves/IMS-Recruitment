import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import Cookies from "universal-cookie";
import { container, item } from "../RecruitmentDashBoard/constants";
import BreadCrumb from "../../../components/BreadCrumb";
import {
  Button,
  Divider,
  Input,
  message,
  Modal,
  Pagination,
  Table,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import RecruitmentInterviewsForm from "./recruitmentinterviewscreate";
import axios from "axios";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { checkFilterActive, string } from "../../../utilities";
import { FaFilter } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import RecruitmentInterviewFilter from "./recruitmentInterviewFilter";
import "./recruitmentinterviews.css";

const RecruitmentInterviews = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [isModalOpen, toggleModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deletionData, setDeletionData] = useState(null);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isCommentModal, toggleCommentModal] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
    candidate: "",
    client: "",
    job: "",
    interview: "",
  });
  const [isFilterModal, toggleFilterModal] = useState(false);

  const { data: clientsList, isFetching: clientFetching } = useQuery(
    ["clients"],
    () =>
      axios.get("/api/client", {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        return newData;
      },
    }
  );

  const { data: jobsList, isFetching: jobFetching } = useQuery(
    ["jobs"],
    () =>
      axios.get("/api/recruitment/job", {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          label: item.designation,
          value: item.id,
        }));
        return newData;
      },
    }
  );

  useEffect(() => {
    document.title = "Recruitment - Interviews";
    refetch(filter);
    // eslint-disable-next-line
  }, []);

  const refetch = (values) => {
    getData(values, page);
  };

  const navigation = [
    { id: 0, name: "Dashboard", url: "/recruitment/dashboard" },
    {
      id: 1,
      name: "Interviews",
      active: true,
    },
  ];

  const onChange = (page) => {
    setPage(page);
    getData(filter, page);
  };

  const renderStatus = (record) => {
    if (record.status === 0)
      return <div className="bold text-red">Arranged</div>;
    if (record.status === 1)
      return <div className="bold text-blue">In Progress</div>;
    if (record.status === 2)
      return <div className="bold text-green">Completed</div>;
  };

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
        `/api/interview?page=${page}&search=${values.search}&candidate=${values.candidate}&client=${values.client}&job=${values.job}&interview=${values.interview}`,
        config
      );
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
      title: "Interview Mode",
      render: (record) => (
        <div className="text-black bold">{record.interview}</div>
      ),
    },
    {
      title: "From",
      render: (record) => (
        <div className="text-grey">
          {dayjs(record.createdAt).format("llll")}
        </div>
      ),
    },
    {
      title: "To",
      render: (record) => (
        <div className="text-grey">
          {dayjs(record.createdAt).format("llll")}
        </div>
      ),
    },
    {
      title: "Candidate Name",
      render: (record) => (
        <div className="text-grey">{record.candidateName}</div>
      ),
    },
    {
      title: "Client name",
      render: (record) => (
        <div className="text-grey">
          {
            clientsList?.filter((item) => item.value === record.client)[0]
              ?.label
          }
        </div>
      ),
    },
    {
      title: "Job Title",
      render: (record) => (
        <div className="text-grey">
          {jobsList?.filter((item) => item.value === record.job)[0]?.label}
        </div>
      ),
    },
    {
      title: "Status",
      render: (record) => renderStatus(record),
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="flex-small-gap">
          <Button
            type="primary"
            onClick={() => {
              toggleCommentModal(true);
              setEditData(record);
            }}
            ghost
          >
            <div className="bold">View Comments</div>
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
          <Button
            type="primary"
            shape="round"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeletionData(record);
              toggleDeleteModal(true);
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
      url: `/api/interview/${deletionData.id}`,
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
        <RecruitmentInterviewsForm
          isModalOpen={isModalOpen}
          setModal={toggleModal}
          editData={editData}
          setEditData={setEditData}
          getData={refetch}
          clientsList={clientsList}
          clientFetching={clientFetching}
          jobsList={jobsList}
          jobFetching={jobFetching}
          filter={filter}
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
        <p>{`Are you sure you want to delete "${deletionData?.candidate}" from interview data?`}</p>
      </Modal>
      <Modal
        title={"More information"}
        open={isCommentModal}
        onCancel={() => {
          setEditData(null);
          toggleCommentModal(false);
        }}
        footer={false}
        centered
      >
        <div className="small-margin"></div>
        <Divider />
        <div className="small-margin flex-space-evenly">
          <div>
            <div className="bolder text-black">Candidate</div>
            <div className="bold text-grey medium-text">
              {editData?.candidateName}
            </div>
          </div>
          <div>
            <div className="bolder text-black">Client</div>
            <div className="bold text-grey medium-text">
              {editData?.clientName}
            </div>
          </div>
          <div>
            <div className="bolder text-black">Status</div>
            <div className="bold text-grey medium-text">
              {editData && renderStatus(editData)}
            </div>
          </div>
        </div>
        <Divider orientation="left" orientationMargin="0">
          <div className="bolder text-black">Comments</div>
        </Divider>
        <div
          className="bold text-grey text-padding-left"
          style={{ textAlign: "justify" }}
        >
          {editData?.comment && string(editData.comment, "loaded")}
        </div>
      </Modal>
      <Header home={"/recruitment/dashboard"} logOut={"/recruitment"} />
      <m.div
        className="recruitment-contacts"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="title-text primary-color" variants={item}>
          Interviews
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
                  candidate: filter?.candidate || "",
                  client: filter?.client || "",
                  job: filter?.job || "",
                  interview: filter?.interview || "",
                });
              }}
            >
              <Input
                placeholder="Search"
                prefix={<AiOutlineSearch className="large-text" />}
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
                toggleFilterModal(true);
              }}
              className={checkFilterActive(filter) && "filter-button--active"}
            >
              <FaFilter className="small-text" />
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setEditData(null);
                toggleModal(true);
              }}
            >
              + Create
            </Button>
          </div>
        </m.div>
        <AnimatePresence>
          {isFilterModal && (
            <RecruitmentInterviewFilter
              isFilterModal={isFilterModal}
              toggleFilterModal={toggleFilterModal}
              filterData={filter}
              setFilterData={setFilter}
              getData={refetch}
              loading={isLoading}
              clientResult={clientsList}
              jobResult={jobsList}
            />
          )}
        </AnimatePresence>
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

export default RecruitmentInterviews;
