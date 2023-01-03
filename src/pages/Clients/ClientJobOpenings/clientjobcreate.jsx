import React, { useState } from "react";
import { Button, Form, Drawer, Input, message, Select } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";

const ClientJobForm = ({
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
    var data = JSON.stringify({
      ...(editData && { id: Number(editData?.id) }),
      name: values?.name,
      email: values?.email,
      department: values?.department,
      number: values?.number,
      fax: values?.fax,
      skype: values?.skype,
      twitter: values?.twitter,
      jobtitle: values?.jobtitle,
      description: values?.description,
      street: values?.street,
      city: values?.city,
      state: values?.state,
      code: values?.code,
      country: values?.country,
    });
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      url: "/api/recruitment/client/contact",
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
        getData();
      })
      .catch(function (error) {
        message.error("Something Went Wrong!", "error");
        setLoading(false);
      });
  };

  return (
    <Drawer
      title={editData ? "Update Contact" : "Create Contact"}
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
            contact: editData?.contact || "",
            isActive: editData?.isActive || false,
            designation: editData?.designation,
            vacancies: editData?.vacancies || 1,
            JobRole: editData?.JobRole || "",
            JobResponsibilities: editData?.JobResponsibilities || "",
            education: editData?.education || "",
            experience: editData?.experience || 0,
            skills: editData?.skills || "",
            gender: editData?.gender || "",
            nationality: editData?.nationality || "",
            age: editData?.age || 1,
            workLocation: editData?.workLocation || "",
            workinghours: editData?.workinghours || 1,
            salary: editData?.salary || 1,
            annualLeave: editData?.annualLeave || false,
            accomodation: editData?.accomodation || "",
            healthInsurance: editData?.healthInsurance || "",
            drivingLicense: editData?.drivingLicense || "",
            languages: editData?.languages || "",
            joiningTicket: editData?.joiningTicket || false,
            annualTicket: editData?.annualTicket || false,
            familyStatus: editData?.familyStatus || "",
            otherBenefits: editData?.otherBenefits || "",
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
            <Select placeholder={"Enter name of the user"} />
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
            <Input placeholder={"Enter email of the user"} />
          </Form.Item>
          <Form.Item
            name="department"
            label={"Department"}
            rules={[
              {
                required: true,
                message: "No Department provided",
              },
            ]}
          >
            <Input placeholder={"Enter department of the user"} />
          </Form.Item>
          <Form.Item
            name="number"
            label={"Phone Number"}
            rules={[
              {
                required: true,
                message: "No Phone No provided",
              },
            ]}
          >
            <Input placeholder={"Enter phone number of the user"} />
          </Form.Item>
          <Form.Item name="fax" label={"Fax No"}>
            <Input placeholder={"Enter fax number of the user"} />
          </Form.Item>
          <Form.Item name="skype" label={"Skype Id"}>
            <Input placeholder={"Enter skype id of the user"} />
          </Form.Item>
          <Form.Item name="twitter" label={"Twitter Profile Link"}>
            <Input placeholder={"Enter profile link to twitter of the user"} />
          </Form.Item>
          <Form.Item
            name="jobtitle"
            label={"Job Title"}
            rules={[
              {
                required: true,
                message: "Job Title Not provided",
              },
            ]}
          >
            <Input placeholder={"Enter job title of the user"} />
          </Form.Item>
          <Form.Item name="description" label={"Description"}>
            <Input placeholder={"Enter description of the user"} />
          </Form.Item>
          <Form.Item name="street" label={"Street"}>
            <Input placeholder={"Enter street within address"} />
          </Form.Item>
          <Form.Item name="city" label={"City"}>
            <Input placeholder={"Enter city within address"} />
          </Form.Item>
          <Form.Item name="state" label={"State"}>
            <Input placeholder={"Enter state within address"} />
          </Form.Item>
          <Form.Item name="code" label={"Pin Code"}>
            <Input placeholder={"Enter pin code within address"} />
          </Form.Item>
          <Form.Item name="country" label={"Country"}>
            <Input placeholder={"Enter country within address"} />
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
              {editData ? "Update Contact" : "Create Contact"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default ClientJobForm;
