import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import Cookies from "universal-cookie";
import BreadCrumb from "../../../components/BreadCrumb";
import { container, item } from "../RecruitmentDashBoard/constants";
import { Button, Input, message, Modal, Pagination, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import { FaFilter } from "react-icons/fa";
import { checkFilterActive, removeUnderScore } from "../../../utilities";
import { AiOutlineSearch } from "react-icons/ai";
import RecruitmentJobAssignmentFilter from "./recruitmentJobAssignmentFilter";
import RecruitmentJobAssignmentForm from "./recruitmentjobassignmentcreate";
import "./recruitmentjobassignment.css";
import { useQuery } from "react-query";

const RecruitmentJobAssignment = () => {
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
  const [filter, setFilter] = useState({
    search: "",
    status: "",
  });
  const [isFilterModal, toggleFilterModal] = useState(false);

  useEffect(() => {
    document.title = "Recruitment - Job Assignment";
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
      name: "Job Assignment",
      active: true,
    },
  ];

  const onChange = (page) => {
    setPage(page);
    getData(filter, page);
  };

  const { data: statusList } = useQuery(
    ["status"],
    () =>
      axios.get("/api/ja/status", {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          label: item.status,
          value: item.id,
        }));
        return newData;
      },
    }
  );

  const { data: jobsList } = useQuery(
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

  const { data: recruiterList } = useQuery(
    ["recruiter"],
    () =>
      axios.get("/api/recruitment", {
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
        `/api/ja?status=${values.status}&page=${page}`,
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
      title: "Designation",
      render: (record) => (
        <div className="text-grey">{record.Jobdesignation}</div>
      ),
    },
    {
      title: "Assigned By",
      render: (record) => (
        <div>
          <div className="text-black bold">{record.recruitmentHeadName}</div>
          <div className="very-small-text text-grey bold">Recruitment Head</div>
        </div>
      ),
    },
    {
      title: "Assigned To",
      render: (record) => (
        <div>
          <div className="text-black bold">{record.recruitmentName}</div>
          <div className="very-small-text text-grey bold">Recruiter</div>
        </div>
      ),
    },
    {
      title: "Assigned At",
      render: (record) => (
        <div className="text-grey">
          {dayjs(record.createdAt).format("llll")}
        </div>
      ),
    },
    {
      title: "Status",
      render: (record) => {
        if (record.statusName === "pending")
          return (
            <div className="text-orange">
              {removeUnderScore(record.statusName)}
            </div>
          );
        if (record.statusName === "open")
          return (
            <div className="text-red">
              {removeUnderScore(record.statusName)}
            </div>
          );
        if (record.statusName === "closed")
          return (
            <div className="text-green">
              {removeUnderScore(record.statusName)}
            </div>
          );
      },
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="flex-small-gap">
          <Button
            type="primary"
            shape="round"
            icon={<EditOutlined />}
            onClick={() => {
              setEditData(record);
              toggleModal(true);
            }}
          />
          {/* <Button
            type="primary"
            shape="round"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeletionData(record);
              toggleDeleteModal(true);
            }}
          /> */}
        </div>
      ),
      width: "200px",
    },
  ];

  const deleteData = async () => {
    setDeleteLoading(true);
    await axios({
      method: "delete",
      url: `/api/client/${deletionData.id}`,
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
        <RecruitmentJobAssignmentForm
          isModalOpen={isModalOpen}
          setModal={toggleModal}
          editData={editData}
          setEditData={setEditData}
          getData={refetch}
          filter={filter}
          jobsList={jobsList}
          recruiterList={recruiterList}
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
          Job Assignment
        </m.div>
        <m.div
          className="recruitment-filter-nav-header-without"
          variants={item}
        >
          <BreadCrumb items={navigation} />
          <div className="flex-small-gap">
            <form
              className="hidden"
              onSubmit={(e) => {
                e.preventDefault();
                setFilter({
                  ...filter,
                  search: name,
                });
                refetch({
                  search: name,
                  name: filter?.name || "",
                  email: filter?.email || "",
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
            <RecruitmentJobAssignmentFilter
              isFilterModal={isFilterModal}
              toggleFilterModal={toggleFilterModal}
              filterData={filter}
              setFilterData={setFilter}
              getData={refetch}
              loading={isLoading}
              statusList={statusList}
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

export default RecruitmentJobAssignment;
