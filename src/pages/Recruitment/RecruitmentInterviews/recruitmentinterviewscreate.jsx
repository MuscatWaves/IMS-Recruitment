import React, { useState } from "react";
import { Button, Form, Drawer, Input, message, Select, DatePicker } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import TextArea from "antd/es/input/TextArea";
import AsyncSelect from "react-select/async";
import "./recruitmentinterviews.css";

const RecruitmentInterviewsForm = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
  clientsList,
  clientFetching,
  candidateList,
  candidateFetching,
  jobsList,
  jobFetching,
  filter,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const user = token && jwtDecode(token);
  const [name, setName] = useState(
    (editData && {
      label: editData?.candidateName,
      value: editData?.candidate,
    }) ||
      null
  );

  const status = [
    {
      id: 1,
      label: "Arranged",
      value: 0,
    },
    {
      id: 2,
      label: "In Progress",
      value: 1,
    },
    {
      id: 3,
      label: "Completed",
      value: 2,
    },
  ];

  const onClose = () => {
    setModal(false);
    setEditData(null);
  };

  const handleUpdateUser = async (values) => {
    if (!name) {
      message.error("Candidate not provided");
      return;
    }
    var data = JSON.stringify({
      ...(editData && { id: Number(editData?.id) }),
      interview: values?.interview,
      candidate: name?.value,
      client: values?.client,
      job: values?.job,
      start_date: dayjs(editData?.start_date).format("YYYY-MM-DD h:mm:ss"),
      end_date: dayjs(editData?.end_date).format("YYYY-MM-DD h:mm:ss"),
      location: values?.location,
      comment: values?.comment,
      status: values?.status,
      createdBy: user.recruitmentId,
      createdAt: dayjs(),
    });
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      url: "/api/interview",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        message.success(response.data.message);
        setLoading(false);
        onClose();
        getData(filter);
      })
      .catch(function (error) {
        message.error("Something Went Wrong!", "error");
        setLoading(false);
      });
  };

  const grabCV = (inputValue) => {
    if (!inputValue) {
      return [];
    }
    var config = {
      method: "get",
      url:
        "https://sparkling-cuff-links-fox.cyclic.app/api/cv?name=" +
        inputValue +
        "&page=1",
      headers: {
        Authorization: token,
      },
    };
    let res = axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        const out = response?.data?.data.map((res) => {
          return { id: res.id, value: res.id, label: res.name };
        });
        return out;
      })
      .catch(function (error) {
        console.log(error);
      });

    return res;
  };

  return (
    <Drawer
      title={editData ? "Update Interview" : "Create Interview"}
      placement="right"
      size="large"
      onClose={onClose}
      open={isModalOpen}
    >
      {isModalOpen && (
        <Form
          layout="vertical"
          className="grid-2"
          onFinish={handleUpdateUser}
          form={form}
          scrollToFirstError={true}
          initialValues={{
            interview: editData?.interview,
            candidate: editData?.candidate,
            client: editData?.client,
            job: editData?.job,
            start_date:
              (editData?.start_date &&
                dayjs(editData?.start_date).isValid() &&
                dayjs(editData?.start_date)) ||
              "",
            end_date:
              (editData?.end_date &&
                dayjs(editData?.end_date).isValid() &&
                dayjs(editData?.end_date)) ||
              "",
            location: editData?.location,
            comment: editData?.comment,
            status: editData?.status,
          }}
        >
          <Form.Item
            className="grid-2-column"
            name="interview"
            label={"Interview"}
            rules={[
              {
                required: true,
                message: "No interview name provided",
              },
            ]}
          >
            <Input placeholder={"Enter interview name"} />
          </Form.Item>
          <div className="flex-small-gap-column grid-2-column">
            <div className="text-black small-text">
              <span className="text-red">*</span> Candidate
            </div>
            <AsyncSelect
              className="custom-selection-box"
              loadOptions={grabCV}
              isClearable
              value={name}
              onChange={(value) => setName(value)}
              placeholder={"Select the candidate for interview"}
            />
          </div>
          <Form.Item
            name="client"
            label={"Client"}
            rules={[
              {
                required: true,
                message: "No client provided",
              },
            ]}
          >
            <Select
              placeholder={"Select the client"}
              options={clientsList}
              loading={clientFetching}
              disabled={clientFetching}
            />
          </Form.Item>
          <Form.Item
            name="job"
            label={"Job"}
            rules={[
              {
                required: true,
                message: "No job provided",
              },
            ]}
          >
            <Select
              placeholder={"Select the job"}
              options={jobsList}
              loading={jobFetching}
              disabled={jobFetching}
            />
          </Form.Item>
          <Form.Item
            name="start_date"
            label={"From Meeting time"}
            rules={[
              {
                required: true,
                message: "No time provided",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
          </Form.Item>
          <Form.Item
            name="end_date"
            label={"To Meeting time"}
            rules={[
              {
                required: true,
                message: "No time provided",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
          </Form.Item>
          <Form.Item
            name="location"
            label={"Location"}
            rules={[
              {
                required: true,
                message: "No location name provided",
              },
            ]}
          >
            <Input placeholder={"Enter location for interview"} />
          </Form.Item>
          <Form.Item
            name="status"
            label={"Interview Status"}
            rules={[
              {
                required: true,
                message: "No interview status provided",
              },
            ]}
          >
            <Select
              placeholder={"Select the status of interview"}
              options={status}
            />
          </Form.Item>
          <Form.Item
            className="grid-2-column"
            name="comment"
            label={"Comments"}
          >
            <TextArea
              placeholder="Enter the comments for interview"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <div
            className="flex-at-end medium-margin-top"
            style={{ gridColumn: "1/3", gap: "1rem" }}
          >
            <Button className="" type="text" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className=""
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {editData ? "Update Interview" : "Create Interview"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default RecruitmentInterviewsForm;
