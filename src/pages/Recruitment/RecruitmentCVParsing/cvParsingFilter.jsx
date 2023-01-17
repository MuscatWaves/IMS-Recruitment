import React from "react";
import { Button, DatePicker, Divider, Form, Input, Select } from "antd";
import { m } from "framer-motion";
import dayjs from "dayjs";

const CVParsingFilter = ({
  filterData,
  setFilterData,
  getData,
  isFilterModal,
  toggleFilterModal,
  loading,
  nationalityResult,
  jobCategoryResult,
}) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
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
      JobCategory: values?.JobCategory || "",
      Age: values?.Age || "",
      JobTitle: values?.JobTitle || "",
      Nationality: values?.Nationality || "",
      Gender: values?.Gender || "",
      MaritalStatus: values?.MaritalStatus || "",
      FromDate:
        (values?.Date &&
          values?.Date[0] &&
          dayjs(values?.Date[0]).format("YYYY-MM-DD")) ||
        "",
      ToDate:
        (values?.Date &&
          values?.Date[1] &&
          dayjs(values?.Date[1]).format("YYYY-MM-DD")) ||
        "",
    });
    setFilterData({
      search: filterData.search,
      JobCategory: values?.JobCategory || "",
      Age: values?.Age || "",
      JobTitle: values?.JobTitle || "",
      Nationality: values?.Nationality || "",
      Gender: values?.Gender || "",
      MaritalStatus: values?.MaritalStatus || "",
      FromDate:
        (values?.Date &&
          values?.Date[0] &&
          dayjs(values?.Date[0]).format("YYYY-MM-DD")) ||
        "",
      ToDate:
        (values?.Date &&
          values?.Date[1] &&
          dayjs(values?.Date[1]).format("YYYY-MM-DD")) ||
        "",
    });
  };

  const genderSelectOptions = [
    { label: "None", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const martialStatusSelectOption = [
    { label: "None", value: "" },
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
    { label: "Widowed", value: "widowed" },
    { label: "Divorced", value: "divorced" },
    { label: "Separated", value: "separated" },
    { label: "Other", value: "other" },
  ];

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
          JobCategory: filterData?.JobCategory || null,
          Age: filterData?.Age || "",
          JobTitle: filterData?.JobTitle || "",
          Nationality: filterData?.Nationality || null,
          Gender: filterData?.Gender || null,
          MaritalStatus: filterData?.MaritalStatus || null,
          Date: [
            (dayjs(filterData.FromDate).isValid() &&
              dayjs(filterData.FromDate)) ||
              "",
            (dayjs(filterData.ToDate).isValid() && dayjs(filterData.ToDate)) ||
              "",
          ],
        }}
      >
        <div className="filter-box-inner">
          <Form.Item name="JobCategory" label={"Job Category"}>
            <Select
              placeholder={"Job Category of the user"}
              options={jobCategoryResult}
              allowClear
            />
          </Form.Item>
          <Form.Item name="Age" label={"Age"}>
            <Input placeholder={"Age of the user"} />
          </Form.Item>
          <Form.Item name="JobTitle" label={"Job Title"}>
            <Input placeholder={"Job Title of the user"} />
          </Form.Item>
          <Form.Item name="Nationality" label={"Nationality"}>
            <Select
              placeholder={"Nationality of the user"}
              options={nationalityResult}
              allowClear
            />
          </Form.Item>
          <Form.Item name="Gender" label={"Gender"}>
            <Select
              placeholder={"Gender of the user"}
              options={genderSelectOptions}
              allowClear
            />
          </Form.Item>
          <Form.Item name="MaritalStatus" label={"Marital Status"}>
            <Select
              placeholder={"Marital Status of the user"}
              options={martialStatusSelectOption}
              allowClear
            />
          </Form.Item>
          <Form.Item name="Date" label={"Date"}>
            <RangePicker
              presets={[
                { label: "Today", value: [dayjs(), dayjs()] },
                {
                  label: "Yesterday",
                  value: [dayjs().add(-1, "d"), dayjs().add(-1, "d")],
                },
                {
                  label: "Last 7 Days",
                  value: [dayjs().add(-7, "d"), dayjs()],
                },
                {
                  label: "Last 14 Days",
                  value: [dayjs().add(-14, "d"), dayjs()],
                },
                {
                  label: "Last 30 Days",
                  value: [dayjs().add(-30, "d"), dayjs()],
                },
                {
                  label: "Last 90 Days",
                  value: [dayjs().add(-90, "d"), dayjs()],
                },
              ]}
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

export default CVParsingFilter;
