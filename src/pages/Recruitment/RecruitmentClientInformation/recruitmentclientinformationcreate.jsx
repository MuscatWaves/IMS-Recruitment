import React, { useState } from "react";
import { Button, Form, Drawer, Input, message, Select } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import TextArea from "antd/es/input/TextArea";

const RecruitmentClientInformationForm = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
  filterValues,
  clientsList,
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
    var data = JSON.stringify({
      ...(editData && { id: Number(editData?.id) }),
      client: values?.client || null,
      clientName: values?.clientName || "",
      crNumber: values?.crNumber || "",
      companyAddress: values?.companyAddress || "",
      clientEmail: values?.clientEmail || "",
      mobile: values?.mobile || "",
      landline: values?.landline || "",
      address: values?.address || "",
      website: values?.website || "",
    });
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      url: "/api/cd",
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
        getData(filterValues);
      })
      .catch(function (error) {
        message.error("Something Went Wrong!", "error");
        setLoading(false);
      });
  };

  return (
    <Drawer
      title={editData ? "Update Client Info" : "Create Client Info"}
      placement="right"
      size="large"
      onClose={onClose}
      open={isModalOpen}
    >
      {isModalOpen && (
        <Form
          layout="vertical"
          className={"grid-2"}
          onFinish={handleUpdateUser}
          form={form}
          scrollToFirstError={true}
          initialValues={{
            client: editData?.client || null,
            clientName: editData?.clientName || "",
            crNumber: editData?.crNumber || "",
            companyAddress: editData?.companyAddress || "",
            clientEmail: editData?.clientEmail || "",
            mobile: editData?.mobile || "",
            landline: editData?.landline || "",
            address: editData?.address || "",
            website: editData?.website || "",
          }}
        >
          <Form.Item
            name="client"
            className="grid-2-column"
            label={"Client"}
            rules={[
              {
                required: true,
                message: "No Client provided",
              },
            ]}
          >
            <Select
              options={clientsList}
              placeholder={"Enter name of the user"}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              showSearch
            />
          </Form.Item>
          <Form.Item
            name="clientName"
            label={"Company Name"}
            rules={[
              {
                required: true,
                message: "No Company Name provided",
              },
            ]}
          >
            <Input placeholder={"Enter company name"} />
          </Form.Item>
          <Form.Item
            name="crNumber"
            label={"CR Number"}
            rules={[
              {
                required: true,
                message: "No CR Number provided",
              },
            ]}
          >
            <Input placeholder={"Enter CR no"} />
          </Form.Item>
          <Form.Item
            name="clientEmail"
            label={"Email"}
            rules={[
              {
                required: true,
                message: "No Email provided",
              },
            ]}
          >
            <Input placeholder={"Enter email"} />
          </Form.Item>
          <Form.Item name="mobile" label={"Mobile no"}>
            <Input placeholder={"Enter mobile number"} />
          </Form.Item>
          <Form.Item name="landline" label={"Landline"}>
            <Input placeholder={"Enter landline number"} />
          </Form.Item>
          <Form.Item name="website" label={"Website"}>
            <Input placeholder={"Enter website address"} />
          </Form.Item>
          <Form.Item
            className="grid-2-column"
            name="companyAddress"
            label={"Company Address"}
          >
            <TextArea placeholder={"Enter Company Address"} />
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
              {editData ? "Update Client Info" : "Create Client Info"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default RecruitmentClientInformationForm;
