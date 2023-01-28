import React from "react";
import { Button, Divider, Form, Select } from "antd";
import { m } from "framer-motion";

const RecruitmentJobAssignmentFilter = ({
  filterData,
  setFilterData,
  getData,
  isFilterModal,
  toggleFilterModal,
  loading,
  statusList,
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
      status: values?.status || "",
    });
    setFilterData({
      search: filterData.search,
      status: values?.status || "",
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
          status: filterData?.status || "",
        }}
      >
        <div className="filter-box-inner">
          <Form.Item name="status" label={"Status"}>
            <Select
              placeholder={"Select Status"}
              options={statusList}
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

export default RecruitmentJobAssignmentFilter;
