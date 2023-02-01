import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { AnimatePresence, m } from "framer-motion";
import Cookies from "universal-cookie";
import Header from "../../../components/Header";
import BreadCrumb from "../../../components/BreadCrumb";
import { container, item } from "../RecruitmentDashBoard/constants";
import {
  Button,
  Input,
  message,
  Pagination,
  Table,
  Tooltip,
  Form,
  Select,
  Alert,
} from "antd";
import { HiMail } from "react-icons/hi";
import dayjs from "dayjs";
import {
  checkFilterActive,
  checkImageIcon,
  formatInput,
} from "../../../utilities";
import { FaFilter } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { AiOutlineExclamationCircle, AiOutlineSearch } from "react-icons/ai";
import CVParsingFilter from "../../Recruitment/RecruitmentCVParsing/cvParsingFilter";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "../../Recruitment/RecruitmentCVParsing/cvParsing.css";

const BatchCreateMultiple = () => {
  const [form] = Form.useForm();
  const navigateTo = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [createLoading, setCreateLoading] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
    JobCategory: "",
    Age: "",
    JobTitle: "",
    Nationality: "",
    Gender: "",
    MaritalStatus: "",
    FromDate: "",
    ToDate: "",
  });
  const [isFilterModal, toggleFilterModal] = useState(false);

  useEffect(() => {
    document.title = "Recruitment - CV Batch Multiple";
    refetch(filter);
    // eslint-disable-next-line
  }, []);

  const refetch = (values) => {
    getData(values, page, size);
  };

  const navigation = [
    { id: 0, name: "Dashboard", url: "/recruitment/dashboard" },
    { id: 1, name: "CV Batch", url: "/recruitment/cvBatch" },
    {
      id: 2,
      name: "CV Multiple Batch create",
      active: true,
    },
  ];

  const onChange = (page, size) => {
    setPage(page);
    setSize(size);
    getData(filter, page, size);
  };

  const getData = async (values, page, size) => {
    setLoading(true);
    setData([]);
    let config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const Data = await axios.get(
        `/api/cv?page=${page}&rows=${size}&search=${values.search}&JobCategory=${values.JobCategory}&Age=${values.Age}&JobTitle=${values.JobTitle}&Nationality=${values.Nationality}&Gender=${values.Gender}&MaritalStatus=${values.MaritalStatus}&FromDate=${values.FromDate}&ToDate=${values.ToDate}&user=`,
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
      title: "Image",
      width: "120px",
      render: (record) => (
        <Tooltip
          title="Click to copy the Oman Jobs profile"
          placement="right"
          mouseEnterDelay={1}
        >
          <img
            className="image-user pointer"
            src={
              record.image
                ? `/files/images/${record.image}`
                : checkImageIcon(record.gender)
            }
            alt="user"
            width={90}
            onClick={() => {
              const name = `${record.name} ${record.job.replace("/", "-")}`
                .replace(/\s+/g, "-")
                .replace(/\./g, "");
              message.success("Link copied to your clipboard");
              navigator.clipboard.writeText(
                `https://share.omanjobs.om/cv/${record.id}/${name}`
              );
            }}
          />
        </Tooltip>
      ),
    },
    {
      title: "Name",
      width: "250px",
      render: (record) => (
        <div
          className="pointer"
          onClick={() => {
            const name = `${record.name} ${record.job.replace("/", "-")}`
              .replace(/\s+/g, "-")
              .replace(/\./g, "");
            window.open(`https://share.omanjobs.om/cv/${record.id}/${name}`);
          }}
        >
          <div className="text-black">{record.name}</div>
          <div className="small-text text-grey">{`${record.nationality}, ${
            record.gender
          } (${moment().diff(
            moment(record.DOB).format("YYYY-MM-DD"),
            "years"
          )})`}</div>
        </div>
      ),
    },
    {
      title: "Job",
      render: (record) => (
        <div className="">
          {record.job ? (
            formatInput(record.job)
          ) : (
            <div className="flex-small-gap text-red">
              <AiOutlineExclamationCircle style={{ fontSize: "26px" }} />
              <div className="text-red">Not Provided</div>
            </div>
          )}
        </div>
      ),
      width: "250px",
    },
    {
      title: "Skills",
      render: (record) =>
        record.skills ? (
          // eslint-disable-next-line
          formatInput(record.skills).replace(/[^\x00-\x7F]t/g, ",")
        ) : (
          <div className="flex-small-gap text-red">
            <AiOutlineExclamationCircle style={{ fontSize: "26px" }} />
            <div className="text-red">Not Provided</div>
          </div>
        ),
      ellipsis: true,
    },
    {
      title: "Email",
      render: (record) => (
        <div className="flex-small-gap-column">
          <div
            className="pointer link flex-small-gap"
            onClick={() =>
              window.open(
                `mailto:${record.email}?subject=${encodeURIComponent(
                  "Oman Jobs"
                )}&body=${encodeURIComponent("For Recruiter - Write here")}`
              )
            }
            title={record.email}
          >
            <HiMail className="large-text" />
            <div
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {record.email}
            </div>
          </div>
          {record.alt_email && (
            <div
              className="pointer link flex-small-gap"
              onClick={() =>
                window.open(
                  `mailto:${record.alt_email}?subject=${encodeURIComponent(
                    "Oman Jobs"
                  )}&body=${encodeURIComponent("For Recruiter - Write here")}`
                )
              }
              title={record.alt_email}
            >
              <HiMail className="large-text" />
              <div
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {record.alt_email}
              </div>
            </div>
          )}
        </div>
      ),
      width: "320px",
    },
    {
      title: "Phone",
      render: (record) => (
        <div className="flex-small-gap-column">
          {record.mobile ? (
            <div
              className="pointer link-green flex-small-gap"
              onClick={() => window.open(`https://wa.me/${record.mobile}`)}
            >
              <RiMessage3Fill className="large-text" />
              {record.mobile}
            </div>
          ) : (
            <div className="flex-small-gap text-red">
              <AiOutlineExclamationCircle style={{ fontSize: "26px" }} />
              <div className="text-red">Not Provided</div>
            </div>
          )}
          {record.alt_phone && (
            <div
              className="pointer link-green flex-small-gap"
              onClick={() => window.open(`https://wa.me/${record.alt_phone}`)}
            >
              <RiMessage3Fill className="large-text" />
              {record.alt_phone}
            </div>
          )}
        </div>
      ),
      width: "200px",
    },
  ];

  const { data: nationalityResult } = useQuery(
    ["nationality"],
    () => axios.get("https://cvapi.muscatwave.com/api/nationality"),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          label: `${!item.nationality ? "None" : item.nationality} - (${
            !item.nationality ? "All" : item.cnt
          })`,
          value: item.nationality,
        }));
        return newData;
      },
    }
  );

  const { data: jobCategoryResult } = useQuery(
    ["category"],
    () => axios.get("https://cvapi.muscatwave.com/api/category"),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          label: `${!item.category ? "None - (All)" : item.category}${
            item.category && `(${item.cnt})`
          }`,
          value: `${!item.category ? "" : item.category}`,
        }));
        newData.shift();
        return newData;
      },
    }
  );

  const handleUpdateUser = async (values) => {
    if (selectedRowKeys.length === 0) {
      message.error("No CVs attached!");
      return;
    }
    var createData = JSON.stringify({
      cv: selectedRowKeys,
      assignId: Number(values?.assignId) || "",
      batchName: values?.batchName || "",
    });
    setCreateLoading(true);
    var config = {
      method: "post",
      url: "/api/batch/multiple",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: createData,
    };

    axios(config)
      .then(function (response) {
        message.success(response.data.message);
        setCreateLoading(false);
      })
      .catch(function (error) {
        message.error("Something Went Wrong!");
        setCreateLoading(false);
      });
  };

  const { data: jobsList } = useQuery(
    ["jobs"],
    () =>
      axios.get("/api/ja", {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          label: item.Jobdesignation,
          value: item.id,
        }));
        return newData;
      },
    }
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* {isModalOpen && (
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
      )} */}
        {/* <Modal
        title="Delete Confirmation"
        open={deleteModal}
        onOk={deleteData}
        onCancel={handleCancel}
        okText={"Delete"}
        okType={"danger"}
        confirmLoading={deleteLoading}
      >
        <p>{`Are you sure you want to delete "${deletionData?.candidate}" from interview data?`}</p>
      </Modal> */}
        <Header home={"/recruitment/dashboard"} logOut={"/recruitment"} />
        <m.div
          className="recruitment-contacts"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <m.div className="title-text primary-color" variants={item}>
            Create Multiple CV Batch
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
                    JobCategory: filter?.JobCategory || "",
                    Age: filter?.Age || "",
                    JobTitle: filter?.JobTitle || "",
                    Nationality: filter?.Nationality || "",
                    Gender: filter?.Gender || "",
                    MaritalStatus: filter?.MaritalStatus || "",
                    FromDate: filter?.FromDate || "",
                    ToDate: filter?.ToDate || "",
                  });
                }}
              >
                <Input
                  placeholder="Search"
                  prefix={<AiOutlineSearch className="large-text" />}
                  size="large"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button className="hidden" htmlType="submit">
                  Search
                </Button>
              </form>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  toggleFilterModal(true);
                }}
                className={checkFilterActive(filter) && "filter-button--active"}
              >
                <FaFilter className="medium-text" />
              </Button>
              {/* <Button
              type="primary"
              size="large"
              onClick={() => {
                setEditData(null);
                toggleModal(true);
              }}
            >
              + Create
            </Button> */}
            </div>
          </m.div>
          <Alert
            message="Warning"
            description={
              <div className="bold">
                Please add the CVs by creating before changing pages. Page
                change will clear your selection.
              </div>
            }
            type="warning"
            showIcon
          />
          <AnimatePresence>
            {isFilterModal && (
              <CVParsingFilter
                isFilterModal={isFilterModal}
                toggleFilterModal={toggleFilterModal}
                filterData={filter}
                setFilterData={setFilter}
                getData={refetch}
                loading={isLoading}
                nationalityResult={nationalityResult}
                jobCategoryResult={jobCategoryResult}
              />
            )}
          </AnimatePresence>
          <Form
            layout="vertical"
            className="grid-2"
            onFinish={handleUpdateUser}
            form={form}
            scrollToFirstError={true}
            initialValues={{
              batchName: "",
              assignId: null,
            }}
          >
            <Form.Item
              name="batchName"
              label={"Batch Name"}
              rules={[
                {
                  required: true,
                  message: "No Batch name provided",
                },
              ]}
            >
              <Input placeholder={"Batch Name"} />
            </Form.Item>
            <Form.Item
              name="assignId"
              label={"Job"}
              rules={[
                {
                  required: true,
                  message: "No Job provided",
                },
              ]}
            >
              <Select
                placeholder={"Select job"}
                options={jobsList}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                showSearch
              />
            </Form.Item>
            <div className="grid-2-column">
              <m.div variants={item}>
                <Table
                  dataSource={data}
                  columns={columns}
                  loading={isLoading}
                  pagination={false}
                  rowKey={"id"}
                  rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                    columnWidth: "80px",
                  }}
                />
                <div className="pagination">
                  <div className="pagination-total">{`Showing ${
                    page === 1 ? 1 : page * size - size + 1
                  } to ${
                    page * size > total ? total : page * size
                  } of ${total}`}</div>
                  <Pagination
                    current={page}
                    onChange={onChange}
                    total={total}
                    pageSize={size}
                    // showSizeChanger={false}
                  />
                </div>
              </m.div>
            </div>
            <div
              className="flex-at-end medium-margin-top"
              style={{ gridColumn: "1/3", gap: "1rem" }}
            >
              <Button className="" type="text" onClick={() => null}>
                Cancel
              </Button>
              <Button
                className=""
                type="primary"
                htmlType="submit"
                loading={createLoading}
              >
                Add CVs to batch
              </Button>
              <Button
                className="filter-button--active"
                loading={createLoading}
                onClick={() => navigateTo("/recruitment/cvBatch")}
              >
                Complete Batch
              </Button>
            </div>
          </Form>
        </m.div>
      </m.div>
    </div>
  );
};

export default BatchCreateMultiple;
