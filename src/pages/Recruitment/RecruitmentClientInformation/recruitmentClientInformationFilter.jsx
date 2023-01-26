import React from "react";
import { Button, Divider, Form, Input } from "antd";
import { m } from "framer-motion";

const RecruitmentClientInformationFilter = ({
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
      clientName: values?.clientName || "",
      crNumber: values?.crNumber || "",
      clientEmail: values?.clientEmail || "",
    });
    setFilterData({
      search: filterData.search,
      clientName: values?.clientName || "",
      crNumber: values?.crNumber || "",
      clientEmail: values?.clientEmail || "",
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
          clientName: filterData?.clientName || "",
          crNumber: filterData?.crNumber || "",
          clientEmail: filterData?.clientEmail || "",
        }}
      >
        <div className="filter-box-inner">
          <Form.Item name="clientName" label={"Client Name"}>
            <Input placeholder={"Name of the Client"} />
          </Form.Item>
          <Form.Item name="crNumber" label={"CR Number"}>
            <Input placeholder={"CR Number of company"} />
          </Form.Item>
          <Form.Item name="clientEmail" label={"Client Email"}>
            <Input placeholder={"Email of the client"} />
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

export default RecruitmentClientInformationFilter;
