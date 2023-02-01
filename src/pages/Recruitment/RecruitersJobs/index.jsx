import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import Cookies from "universal-cookie";
import BreadCrumb from "../../../components/BreadCrumb";
import { container, item } from "../RecruitmentDashBoard/constants";
import { Button, Input, message, Modal, Pagination, Table } from "antd";
import axios from "axios";
import RecruitmentJobForm from "./recruitmentjobcreate";
import JdViewData from "./JdViewData";
import { AiOutlineSearch } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { checkFilterActive, removeUnderScore } from "../../../utilities";
import { useQuery } from "react-query";
import RecruitmentJobOpeningFilter from "./recruitmentJobOpeningFilter";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import "./recruitmentjobopenings.css";

const RecruiterJobs = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const user = jwtDecode(token);
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
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  const [filter, setFilter] = useState({
    status: "",
    search: "",
  });
  const [isFilterModal, toggleFilterModal] = useState(false);

  useEffect(() => {
    document.title = "Recruitment - Assigned Jobs";
    refetch(filter);
    // eslint-disable-next-line
  }, []);

  const refetch = (values) => {
    getData(values, page);
  };

  // const { data: contactResult } = useQuery(
  //   ["contactResult"],
  //   () =>
  //     axios.get("/api/recruitment/contact", {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }),
  //   {
  //     select: (data) => {
  //       const newData = data.data.data.map((item) => ({
  //         label: item.name,
  //         value: item.id,
  //       }));
  //       return newData;
  //     },
  //   }
  // );

  const { data: clientResult } = useQuery(
    ["clientResult"],
    () =>
      axios.get("/api/client", {
        headers: {
          Authorization: token,
        },
      }),
    {
      enabled: user.isHead,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          label: `${item.name} - ${item.clientDetail_clientName}`,
          value: item.id,
        }));
        return newData;
      },
    }
  );

  const navigation = [
    { id: 0, name: "Dashboard", url: "/recruitment/dashboard" },
    {
      id: 1,
      name: "Job Openings",
      active: true,
    },
  ];

  const onChange = (page) => {
    setPage(page);
    getData(filter, page);
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
          setData([]);
        }
      }
    } catch (err) {
      console.log(err);
      setData([]);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Job Title",
      render: (record) => (
        <div className="text-grey">{record.Jobdesignation}</div>
      ),
    },
    {
      title: "Company Name",
      render: (record) => <div className="text-grey">{record.companyName}</div>,
    },
    {
      title: "Website",
      render: (record) => (
        <div
          className="text-grey link pointer"
          onClick={() => window.open(record.companyWebsite)}
        >
          {record.companyWebsite}
        </div>
      ),
    },
    {
      title: "Created At",
      render: (record) => (
        <div className="text-grey">{dayjs(record.createdAt).format("ll")}</div>
      ),
    },
    user?.isHead && {
      title: "Client",
      render: (record) => (
        <div className="text-grey">
          {
            clientResult?.filter((item) => item.value === record.client)[0]
              ?.label
          }
        </div>
      ),
    },
    // {
    //   title: "Contact",
    //   render: (record) => (
    //     <div className="text-grey">
    //       {
    //         contactResult?.filter((item) => item.value === record.contact)[0]
    //           ?.label
    //       }
    //     </div>
    //   ),
    // },
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
            onClick={() => {
              setShowDetailsData(record);
              setShowDetailsModal(true);
            }}
            ghost
          >
            <div className="bold">View Job Description</div>
          </Button>
        </div>
      ),
      width: "300px",
    },
  ].filter((v) => v);

  const deleteData = async () => {
    setDeleteLoading(true);
    await axios({
      method: "delete",
      url: `/api/recruitment/job/${deletionData.id}`,
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
        <RecruitmentJobForm
          isModalOpen={isModalOpen}
          setModal={toggleModal}
          editData={editData}
          setEditData={setEditData}
          getData={refetch}
          filterValues={filter}
          clientResult={clientResult}
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
      <Header home={"/recruitment/dashboard"} logOut={"/recruitment"} />
      <m.div
        className="recruitment-contacts"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="title-text primary-color" variants={item}>
          Job Openings
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
                  designation: filter?.designation || "",
                  gender: filter?.gender || "",
                  nationality: filter?.nationality || "",
                  client: filter?.client || "",
                  contact: filter?.contact || "",
                  search: name,
                });
              }}
            >
              <Input
                placeholder="Search here!"
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
            {user?.isHead && (
              <Button
                type="primary"
                onClick={() => {
                  setEditData(null);
                  toggleModal(true);
                }}
              >
                + Create
              </Button>
            )}
          </div>
        </m.div>
        <AnimatePresence>
          {isFilterModal && (
            <RecruitmentJobOpeningFilter
              isFilterModal={isFilterModal}
              toggleFilterModal={toggleFilterModal}
              filterData={filter}
              setFilterData={setFilter}
              getData={refetch}
              loading={isLoading}
              user={user}
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

export default RecruiterJobs;
