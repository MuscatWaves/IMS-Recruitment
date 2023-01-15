import React from "react";
import { Button, Divider, Form, Input, Select } from "antd";
import { m } from "framer-motion";

const RecruitmentInterviewFilter = ({
  filterData,
  setFilterData,
  getData,
  isFilterModal,
  toggleFilterModal,
  loading,
  clientResult,
  jobResult,
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
      candidate: values?.candidate || "",
      client: values?.client || "",
      job: values?.job || "",
      interview: values?.interview || "",
    });
    setFilterData({
      search: filterData.search,
      candidate: values?.candidate || "",
      client: values?.client || "",
      job: values?.job || "",
      interview: values?.interview || "",
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
          candidate: filterData?.candidate || "",
          client: filterData?.client || null,
          job: filterData?.job || null,
          interview: filterData?.interview || "",
        }}
      >
        <div className="filter-box-inner">
          <Form.Item name="candidate" label={"Candidate"}>
            <Input placeholder={"Candidate name"} />
          </Form.Item>
          <Form.Item name="interview" label={"Interview"}>
            <Input placeholder={"Email of the user"} />
          </Form.Item>
          <Form.Item name="client" label={"Client"}>
            <Select
              placeholder={"Client of the job"}
              options={clientResult}
              allowClear
            />
          </Form.Item>
          <Form.Item name="job" label={"Job"}>
            <Select placeholder={"Job name"} options={jobResult} allowClear />
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

export default RecruitmentInterviewFilter;
