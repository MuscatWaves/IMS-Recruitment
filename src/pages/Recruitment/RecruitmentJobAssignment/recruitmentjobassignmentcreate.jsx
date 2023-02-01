import React, { useState } from "react";
import { Button, Form, Drawer, message, Select } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";

const RecruitmentJobAssignmentForm = ({
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

  const onClose = () => {
    setModal(false);
    setEditData(null);
  };

  const handleUpdateUser = async (values, status = editData?.status) => {
    var createData = JSON.stringify({
      job: Number(values?.job) || "",
      recruitment: values?.recruitment || "",
    });
    var updateData = JSON.stringify({
      ...(editData && { id: Number(editData?.id) }),
      status: values?.status || "",
    });
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      url: "/api/ja",
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

  return (
    <Drawer
      title={editData ? "Update Job Assignment" : "Create Assignment"}
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
            job: editData?.job || null,
            recruitment: editData?.recruitment || null,
            status: editData?.status || null,
          }}
        >
          {!editData && (
            <Form.Item
              name="job"
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
          {!editData && (
            <Form.Item
              name="recruitment"
              label={"Recruiter"}
              rules={[
                {
                  required: true,
                  message: "No recruiter provided",
                },
              ]}
            >
              <Select
                placeholder={"Select Recruiter"}
                options={recruiterList}
              />
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
              {editData ? "Update Job Assignment" : "Create Job Assignment"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default RecruitmentJobAssignmentForm;
