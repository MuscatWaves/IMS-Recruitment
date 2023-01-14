import React from "react";
import { Button, Divider, Form, Input, Select } from "antd";
import { m } from "framer-motion";

const RecruitmentJobOpeningFilter = ({
  filterData,
  setFilterData,
  getData,
  isFilterModal,
  clientResult,
  contactResult,
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
      designation: values?.designation || "",
      gender: values?.gender || "",
      nationality: values?.nationality || "",
      client: values?.client || "",
      contact: values?.contact || "",
    });
    setFilterData({
      search: filterData.search,
      designation: values?.designation || "",
      gender: values?.gender || "",
      nationality: values?.nationality || "",
      client: values?.client || "",
      contact: values?.contact || "",
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
          designation: filterData?.designation || "",
          gender: filterData?.gender || null,
          nationality: filterData?.nationality || "",
          client: filterData?.client || null,
          contact: filterData?.contact || null,
        }}
      >
        <div className="filter-box-inner">
          <Form.Item name="designation" label={"Job Title"}>
            <Input placeholder={"Designation of the user"} />
          </Form.Item>
          <Form.Item name="gender" label={"Gender"}>
            <Select
              placeholder={"Gender of the user"}
              options={[
                { label: "Any", value: "Any" },
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item name="nationality" label={"Nationality"}>
            <Input placeholder={"Nationality of the user"} />
          </Form.Item>
          <Form.Item name="client" label={"Client"}>
            <Select
              placeholder={"Client of the job"}
              options={clientResult}
              allowClear
            />
          </Form.Item>
          <Form.Item name="contact" label={"Contact"}>
            <Select
              placeholder={"Contact of the job"}
              options={contactResult}
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

export default RecruitmentJobOpeningFilter;
