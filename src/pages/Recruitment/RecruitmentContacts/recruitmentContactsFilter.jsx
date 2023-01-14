import React from "react";
import { Button, Divider, Form, Input, Select } from "antd";
import { m } from "framer-motion";

const RecruitmentContactsFilter = ({
  filterData,
  setFilterData,
  getData,
  isFilterModal,
  clientsList,
  toggleFilterModal,
  loading,
}) => {
  const [form] = Form.useForm();

  const item = {
    hidden: {
      opacity: 0,
      y: "100px",
    },
    show: {
      opacity: 1,
      y: "0px",
      delay: 1,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 9,
      },
    },
  };

  const handleSearching = async (values) => {
    getData({
      search: filterData.search,
      name: values?.name || "",
      email: values?.email || "",
      department: values?.department || "",
      client: values?.client || "",
      jobtitle: values?.jobtitle || "",
    });
    setFilterData({
      search: filterData.search,
      name: values?.name || "",
      email: values?.email || "",
      department: values?.department || "",
      client: values?.client || "",
      jobtitle: values?.jobtitle || "",
    });
  };

  return (
    <m.div
      variants={item}
      initial="hidden"
      animate="show"
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <Form
        layout="vertical"
        className="filter-box"
        onFinish={handleSearching}
        form={form}
        scrollToFirstError={true}
        initialValues={{
          name: filterData?.name || "",
          email: filterData?.email || "",
          department: filterData?.department || "",
          client: filterData?.client || null,
          jobtitle: filterData?.jobtitle || "",
        }}
      >
        <div className="filter-box-inner">
          <Form.Item name="name" label={"Name"}>
            <Input placeholder={"Name of the user"} />
          </Form.Item>
          <Form.Item name="email" label={"Email"}>
            <Input placeholder={"Email of the user"} />
          </Form.Item>
          <Form.Item name="jobtitle" label={"Job title"}>
            <Input placeholder={"Job title of the user"} />
          </Form.Item>
          <Form.Item name="department" label={"Department"}>
            <Input placeholder={"Department of the user"} />
          </Form.Item>
          <Form.Item name="client" label={"Client"}>
            <Select
              placeholder={"Client of the user"}
              options={clientsList}
              allowClear
            />
          </Form.Item>
        </div>
        <Divider />
        <div className="flex-at-end">
          <Button
            className=""
            type="text"
            onClick={() => {
              toggleFilterModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className=""
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Search
          </Button>
        </div>
      </Form>
    </m.div>
  );
};

export default RecruitmentContactsFilter;
