import React, { useState } from "react";
import { Button, Form, Drawer, message, Select } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";

const ClientCvBatchForm = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
  filter,
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

  const handleUpdateUser = async (values) => {
    var updateData = JSON.stringify({
      ...(editData && { id: Number(editData?.id) }),
      status: values?.status || "",
    });

    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      url: "/api/batchclient",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: updateData,
    };

    axios(config)
      .then(function (response) {
        message.success(response.data.message);
        setLoading(false);
        onClose();
        getData(filter);
      })
      .catch(function (error) {
        message.error(error?.response?.data?.error || "Something went wrong");
        setLoading(false);
      });
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
            status: editData?.status || null,
          }}
        >
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
              Update CV batch
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default ClientCvBatchForm;
