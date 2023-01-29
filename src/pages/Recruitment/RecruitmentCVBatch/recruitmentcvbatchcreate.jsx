import React, { useState } from "react";
import { Button, Form, Drawer, message, Select, Input } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import AsyncSelect from "react-select/async";

const RecruitmentCvBatchForm = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
  filter,
  jobsList,
  recruiterList,
  statusList,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [name, setName] = useState(
    (editData && {
      label: editData?.candidateName,
      value: editData?.candidate,
    }) ||
      null
  );

  const onClose = () => {
    setModal(false);
    setEditData(null);
  };

  const handleUpdateUser = async (values, status = editData?.status) => {
    var createData = JSON.stringify({
      cv: name?.value || "",
      assignId: Number(values?.assignId) || "",
      batchName: values?.batchName || "",
    });
    var updateData = JSON.stringify({
      ...(editData && { id: Number(editData?.id) }),
      status: values?.status || "",
    });
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      url: "/api/batch",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: editData ? updateData : createData,
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
      title={editData ? "Update CV Batch" : "Create CV Batch"}
      placement="right"
      onClose={onClose}
      open={isModalOpen}
    >
      {isModalOpen && (
        <Form
          layout="vertical"
          className="flex-small-gap-column"
          onFinish={handleUpdateUser}
          form={form}
          scrollToFirstError={true}
          initialValues={{
            batchName: editData?.batchName || "",
            assignId: editData?.assignId || null,
            status: editData?.status || null,
          }}
        >
          {!editData && (
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
          )}
          {!editData && (
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
              <Select placeholder={"Select job"} options={jobsList} />
            </Form.Item>
          )}
          {!editData && (
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
          )}
          {editData && (
            <Form.Item
              name="status"
              label={"Status"}
              rules={[
                {
                  required: true,
                  message: "No Status provided",
                },
              ]}
            >
              <Select placeholder={"Select Status"} options={statusList} />
            </Form.Item>
          )}
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
              {editData ? "Update CV batch" : "Create CV batch"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default RecruitmentCvBatchForm;
