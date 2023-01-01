import React, { useState } from "react";
import { Button, Form, Drawer, Input, Switch, message } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import Password from "antd/lib/input/Password";

const ClientContactForm = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
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
    var bodyFormDataUpdate = new FormData();
    editData && bodyFormDataUpdate.append("id", editData.id);
    bodyFormDataUpdate.append("name", values.name);
    setLoading(true);
    await axios({
      method: editData ? "PUT" : "POST",
      url: `/api/user`,
      data: bodyFormDataUpdate,
      headers: {
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          message.success(response.data.message);
          setLoading(false);
          onClose();
          getData();
        } else {
          if (response.status === 201) {
            message.error(response.data.error, "error");
            setLoading(false);
          } else {
            message.error("Something Went Wrong!", "error");
            setLoading(false);
          }
        }
      })
      .catch(function (response) {
        message.error("Something Went Wrong!", "error");
      });
  };

  return (
    <Drawer
      title={editData ? "Update the User Profile" : "Create a New User"}
      placement="right"
      onClose={onClose}
      open={isModalOpen}
    >
      {isModalOpen && (
        <Form
          layout="vertical"
          className={"flex-small-gap1-column"}
          onFinish={handleUpdateUser}
          form={form}
          scrollToFirstError={true}
          initialValues={{
            name: editData?.name,
            email: editData?.email,
            password: "",
          }}
        >
          <Form.Item
            name="name"
            label={"Name"}
            rules={[
              {
                required: true,
                message: "No Username provided",
              },
            ]}
          >
            <Input placeholder={"Enter name of the user"} />
          </Form.Item>
          <Form.Item
            name="email"
            label={"Email"}
            rules={[
              {
                required: true,
                message: "No Email provided",
              },
            ]}
          >
            <Input
              placeholder={"Enter email of the user"}
              disabled={editData}
            />
          </Form.Item>
          {!editData && (
            <Form.Item
              name="password"
              className="zoom-in-animation"
              label={"New Password"}
              rules={[
                {
                  required: true,
                  message: "No Password provided",
                },
              ]}
            >
              <Password placeholder={"Enter name of the user"} />
            </Form.Item>
          )}
          <p className="bolder text-black">Permissions</p>
          <div className="grid-2">
            <Form.Item
              name={"uploadcv_access"}
              label={"Upload CV access"}
              valuePropName={"checked"}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={"searchcv_access"}
              label={"Search CV access"}
              valuePropName={"checked"}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={"rejectedcv_access"}
              label={"Rejected CV access"}
              valuePropName={"checked"}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={"buildcv_access"}
              label={"Build CV access"}
              valuePropName={"checked"}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={"userreport_access"}
              label={"User Report access"}
              valuePropName={"checked"}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={"cvView"}
              label={"CV View/Download"}
              valuePropName={"checked"}
            >
              <Switch />
            </Form.Item>
          </div>
          <div className="flex-at-end medium-margin-top">
            <Button className="" type="text" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className=""
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {editData ? "Update Account" : "Create Account"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default ClientContactForm;
