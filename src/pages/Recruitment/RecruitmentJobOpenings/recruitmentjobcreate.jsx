import React, { useState } from "react";
import {
  Button,
  Form,
  Drawer,
  Input,
  message,
  Select,
  Switch,
  InputNumber,
} from "antd";
import axios from "axios";
import Cookies from "universal-cookie";

const RecruitmentJobForm = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
  filterValues,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { TextArea } = Input;

  const onClose = () => {
    setModal(false);
    setEditData(null);
  };

  const handleUpdateUser = async (values) => {
    var data = JSON.stringify({
      ...(editData && { id: editData?.id }),
      // contact: values?.contact,
      isActive: values?.isActive,
      designation: values?.designation,
      vacancies: values?.vacancies,
      JobRole: values?.JobRole,
      JobResponsibilities:
        (values.JobResponsibilities &&
          // eslint-disable-next-line
          values.JobResponsibilities.replace(/[^\x00-\x7F]/g, "-")) ||
        "",
      education:
        (values.education &&
          // eslint-disable-next-line
          values.education.replace(/[^\x00-\x7F]/g, "-")) ||
        "",
      experience:
        (values.experience &&
          // eslint-disable-next-line
          values.experience.replace(/[^\x00-\x7F]/g, "-")) ||
        "",
      skills:
        (values.skills &&
          // eslint-disable-next-line
          values.skills.replace(/[^\x00-\x7F]/g, "-")) ||
        "",
      gender: values?.gender,
      nationality: values?.nationality,
      age: values?.age,
      workLocation: values?.workLocation,
      workinghours:
        (values.workinghours &&
          // eslint-disable-next-line
          values.workinghours.replace(/[^\x00-\x7F]/g, "-")) ||
        "",
      salary:
        (values.salary &&
          // eslint-disable-next-line
          values.salary.replace(/[^\x00-\x7F]/g, "-")) ||
        "",
      annualLeave: values?.annualLeave,
      accomodation: values?.accomodation,
      healthInsurance: values?.healthInsurance,
      drivingLicense: values?.drivingLicense,
      languages: values?.languages,
      joiningTicket: values?.joiningTicket,
      annualTicket: values?.annualTicket,
      familyStatus: values?.familyStatus,
      otherBenefits:
        (values.otherBenefits &&
          // eslint-disable-next-line
          values.otherBenefits.replace(/[^\x00-\x7F]/g, "-")) ||
        "",
    });
    setLoading(true);
    var config = {
      method: editData ? "put" : "post",
      url: "/api/recruitment/job",
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
      title={editData ? "Update Job" : "Create Job"}
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
            // contact: editData?.contact || null,
            isActive: editData?.isActive || false,
            designation: editData?.designation,
            vacancies: editData?.vacancies || 1,
            JobRole: editData?.JobRole || "",
            JobResponsibilities: editData?.JobResponsibilities || "",
            education: editData?.education || "",
            experience: editData?.experience || "",
            skills: editData?.skills || "",
            gender: editData?.gender || "",
            nationality: editData?.nationality || "",
            age: editData?.age || "",
            workLocation: editData?.workLocation || "",
            workinghours: editData?.workinghours || "",
            salary: editData?.salary || "",
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
          {/* <Form.Item
            name="contact"
            label={"Contact"}
            rules={[
              {
                required: true,
                message: "No Contact provided",
              },
            ]}
          >
            <Select
              placeholder="Please select a contact"
              options={contactResult}
              allowClear
            />
          </Form.Item> */}
          <Form.Item
            name={"isActive"}
            label={"Job Status"}
            valuePropName={"checked"}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="designation"
            label={"Designation"}
            rules={[
              {
                required: true,
                message: "No Designation provided",
              },
            ]}
          >
            <Input placeholder={"Enter designation for the job"} />
          </Form.Item>
          <Form.Item
            name="vacancies"
            label={"Vacancies"}
            rules={[
              {
                required: true,
                message: "No of vacancies",
              },
            ]}
          >
            <InputNumber
              placeholder={"Enter no of vacancies for the job"}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            className="grid-2-column"
            name="JobRole"
            label={"JobRole"}
            rules={[
              {
                required: true,
                message: "No JobRole provided",
              },
            ]}
          >
            <TextArea
              placeholder="Enter the job role for the job"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            className="grid-2-column"
            name="JobResponsibilities"
            label={"JobResponsibilities"}
            rules={[
              {
                required: true,
                message: "No JobResponsibilities provided",
              },
            ]}
          >
            <TextArea
              placeholder="Enter the job responsibilities for the job"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            className="grid-2-column"
            name="education"
            label={"Education"}
            rules={[
              {
                required: true,
                message: "No education provided",
              },
            ]}
          >
            <TextArea
              placeholder="Enter the education needed for the job"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            className="grid-2-column"
            name="experience"
            label={"Experience"}
            rules={[
              {
                required: true,
                message: "No Experience provided",
              },
            ]}
          >
            <TextArea
              placeholder="Enter the experience required for the job"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            className="grid-2-column"
            name="skills"
            label={"Skills"}
            rules={[
              {
                required: true,
                message: "No Skills provided",
              },
            ]}
          >
            <TextArea
              placeholder="Enter the skills required for the job"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label={"Gender"}
            rules={[
              {
                required: true,
                message: "No Gender provided",
              },
            ]}
          >
            <Select
              placeholder="Please select a contact"
              options={[
                { label: "Any", value: "Any" },
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="nationality"
            label={"Nationality"}
            rules={[
              {
                required: true,
                message: "No Nationality provided",
              },
            ]}
          >
            <Input placeholder={"Enter nationality needed for this job"} />
          </Form.Item>
          <Form.Item
            name="age"
            label={"Age"}
            rules={[
              {
                required: true,
                message: "No Age provided",
              },
            ]}
          >
            <Input placeholder={"Enter age group required for the job"} />
          </Form.Item>
          <Form.Item
            name="workLocation"
            label={"Work Location"}
            rules={[
              {
                required: true,
                message: "No Work Location provided",
              },
            ]}
          >
            <Input placeholder={"Enter Work Location for this job"} />
          </Form.Item>
          <Form.Item
            name="workinghours"
            label={"Working Hours"}
            rules={[
              {
                required: true,
                message: "No working hours provided",
              },
            ]}
          >
            <TextArea
              placeholder="Enter the working hours provided for the job"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            name="salary"
            label={"Salary"}
            rules={[
              {
                required: true,
                message: "No Salary Details provided",
              },
            ]}
          >
            <TextArea
              placeholder="Enter the salary details provided for this job"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            name={"annualLeave"}
            label={"Annual Leave"}
            rules={[
              {
                required: true,
                message: "No Annual leave provided",
              },
            ]}
          >
            <Input placeholder={"Enter annual leave provided by the company"} />
          </Form.Item>
          <Form.Item
            name="accomodation"
            label={"Accomodation"}
            rules={[
              {
                required: true,
                message: "No Work Location provided",
              },
            ]}
          >
            <Input
              placeholder={"Enter if Accomodation is provided by the company"}
            />
          </Form.Item>
          <Form.Item
            name="healthInsurance"
            label={"Health Insurance"}
            rules={[
              {
                required: true,
                message: "No Health Insurance provided",
              },
            ]}
          >
            <Input
              placeholder={
                "Enter if health Insurance is provided by the company"
              }
            />
          </Form.Item>
          <Form.Item
            name="drivingLicense"
            label={"Driving License"}
            rules={[
              {
                required: true,
                message: "No answer provided",
              },
            ]}
          >
            <Input
              placeholder={"Enter if Driving License is required for the job"}
            />
          </Form.Item>
          <Form.Item
            name="languages"
            label={"Languages"}
            rules={[
              {
                required: true,
                message: "No Language provided",
              },
            ]}
          >
            <Input placeholder={"Enter languages required for the job"} />
          </Form.Item>
          <Form.Item
            name={"joiningTicket"}
            label={"Joining Ticket provided"}
            valuePropName={"checked"}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="familyStatus"
            label={"Family Status"}
            rules={[
              {
                required: true,
                message: "No answer provided",
              },
            ]}
          >
            <Input
              placeholder={"Enter family status requirement for the job"}
            />
          </Form.Item>
          <Form.Item
            name={"annualTicket"}
            label={"Annual Ticket provided"}
            valuePropName={"checked"}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            className="grid-2-column"
            name="otherBenefits"
            label={"Other Benefits"}
            rules={[
              {
                required: true,
                message: "No Other Benefits provided",
              },
            ]}
          >
            <TextArea
              placeholder="Enter the other benefits provided for the job"
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
              {editData ? "Update Job" : "Create Job"}
            </Button>
          </div>
        </Form>
      )}
    </Drawer>
  );
};

export default RecruitmentJobForm;
