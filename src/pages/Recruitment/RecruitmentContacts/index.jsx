import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import Cookies from "universal-cookie";
import BreadCrumb from "../../../components/BreadCrumb";
import { container, item } from "../RecruitmentDashBoard/constants";
import { Button, Input, message, Modal, Pagination, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import userImage from "../../../images/user-no-image.png";
import {
  FaAddressBook,
  FaFax,
  FaFilter,
  FaPhoneAlt,
  FaSkype,
  FaTwitter,
} from "react-icons/fa";
import { AiFillMail, AiOutlineSearch } from "react-icons/ai";
import RecruitmentContactForm from "./recruitmentcontactcreate";
import { useQuery } from "react-query";
import "./recruitmentcontacts.css";
import RecruitmentContactsFilter from "./recruitmentContactsFilter";
import { checkFilterActive } from "../../../utilities";

const RecruitmentContacts = () => {
  const cookies = new Cookies();
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
  const [filter, setFilter] = useState({
    search: "",
    name: "",
    email: "",
    department: "",
    client: "",
    jobtitle: "",
  });
  const [isFilterModal, toggleFilterModal] = useState(false);

  useEffect(() => {
    document.title = "Recruitment - Contacts";
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
      name: "Contacts",
      active: true,
    },
  ];

  const onChange = (page) => {
    setPage(page);
    getData(filter, page);
  };

  const { data: clientsList } = useQuery(
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
        `/api/recruitment/contact?page=${page}&search=${values.search}&name=${values.name}&email=${values.email}&department=${values.department}&client=${values.client}&jobtitle=${values.jobtitle}`,
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
      title: "Name",
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
      title: "Actions",
      render: (record) => (
        <div className="flex-small-gap">
          <Button
            type="primary"
            onClick={() => {
              setShowDetailsData(record);
              setShowDetailsModal(true);
            }}
          >
            View Profile
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
      url: `/api/recruitment/contact/${deletionData.id}`,
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
        setData([]);
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
        <RecruitmentContactForm
          isModalOpen={isModalOpen}
          setModal={toggleModal}
          editData={editData}
          setEditData={setEditData}
          getData={refetch}
          filterValues={filter}
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
        <p>{`Are you sure you want to delete "${deletionData?.name}" from contact data?`}</p>
      </Modal>
      <Modal
        title="Contact Information"
        open={showDetailsModal}
        footer={false}
        onCancel={() => {
          setShowDetailsModal(false);
          setShowDetailsData({});
        }}
        centered
      >
        <div className="client-contact-card">
          <div className="client-contact-card--first">
            <div>
              <div className="large-text bold">{showDetailsData.name}</div>
              <div className="medium-text text-grey">
                {showDetailsData.jobtitle}
              </div>
              <div className="text-light-grey small-text">
                {showDetailsData.description}
              </div>
            </div>
            <div>
              <div className="flex-small-gap primary-color">
                <FaPhoneAlt className="text-grey" />
                <div>{showDetailsData.number}</div>
              </div>
              <div className="flex-small-gap primary-color">
                <AiFillMail className="text-grey" />
                <div>{showDetailsData.email}</div>
              </div>
              <div className="flex-small-gap primary-color">
                <FaFax className="text-grey" />
                <div>{showDetailsData.fax}</div>
              </div>
              <div className="flex-small-gap primary-color">
                <FaSkype className="text-grey" />
                <div>{showDetailsData.skype}</div>
              </div>
              <div className="flex-small-gap primary-color">
                <FaAddressBook className="text-grey" />
                <div>
                  {`${showDetailsData.street} ${showDetailsData.city} ${showDetailsData.state} ${showDetailsData.country}`}
                  <span>
                    {showDetailsData.code && `-${showDetailsData.code}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="client-contact-card--second">
            <img src={userImage} width={150} height={150} alt={"user"} />
            <div className="flex-small-gap">
              <AiFillMail
                className="pointer"
                style={{ fontSize: "20px", color: "#c71610" }}
              />
              <></>
              <FaTwitter
                className="pointer"
                style={{ fontSize: "20px", color: "#1DA1F2" }}
                onClick={() =>
                  showDetailsData.skype && window.open("https://www.google.com")
                }
              />
            </div>
          </div>
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
          Contacts
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
                refetch({
                  search: name,
                  name: filter?.name || "",
                  email: filter?.email || "",
                  department: filter?.department || "",
                  client: filter?.client || "",
                  jobtitle: filter?.jobtitle || "",
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
            <Button
              type="primary"
              size="large"
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
            <RecruitmentContactsFilter
              isFilterModal={isFilterModal}
              toggleFilterModal={toggleFilterModal}
              filterData={filter}
              setFilterData={setFilter}
              getData={refetch}
              loading={isLoading}
              clientsList={clientsList}
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

export default RecruitmentContacts;
