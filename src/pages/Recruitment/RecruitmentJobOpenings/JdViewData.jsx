import { Divider, Modal } from "antd";
import React from "react";
import { string } from "../../../utilities";
import OmanJobsLogo from "../../../images/oj-small.png";
import "./recruitmentjobopenings.css";

const JdViewData = ({ data, setData, open, setOpen }) => {
  return (
    <Modal
      title={<img src={OmanJobsLogo} alt={"logo"} width={100} height={100} />}
      open={open}
      footer={false}
      onCancel={() => {
        setOpen(false);
        setData(null);
      }}
      centered
      width={1000}
    >
      <Divider />
      <div className="flex-gap-column">
        <div className="small-margin flex-space-evenly">
          <div>
            <div className="bolder text-black">Designation</div>
            <div className="bold text-grey medium-text">{data.designation}</div>
          </div>
          <div>
            <div className="bolder text-black">No of Vacancies</div>
            <div className="bold text-grey medium-text">{data.vacancies}</div>
          </div>
          <div>
            <div className="bolder text-black">Job Status</div>
            <div className="bold text-grey medium-text">
              {data.isActive ? (
                <div className="text-green bold">Active</div>
              ) : (
                <div className="text-red bold">Inactive</div>
              )}
            </div>
          </div>
        </div>
        {/* Job Role */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Job Role</div>
          </Divider>
          <div className="bold text-grey text-padding-left">{data.JobRole}</div>
        </div>
        {/* Job Responsibilities */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Job Responsibilities</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.JobResponsibilities &&
              string(data.JobResponsibilities, "loaded")}
          </div>
        </div>
        {/* Education */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Education</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.education && string(data.education, "loaded")}
          </div>
        </div>
        {/* Experience */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Experience</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.experience && string(data.experience, "loaded")}
          </div>
        </div>
        {/* Skills */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Skills</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.skills && string(data.skills, "loaded")}
          </div>
        </div>
        {/* Gender */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Gender</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.gender}
          </div>
        </div>
        {/* Nationality */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Nationality</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.nationality}
          </div>
        </div>
        {/* Age Group */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Age Group</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.age}
          </div>
        </div>
        {/* Work Location */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Work Location</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.workLocation}
          </div>
        </div>
        {/* Work Hours */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Work Hours</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.workinghours && string(data.workinghours, "loaded")}
          </div>
        </div>
        {/* Salary */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Salary</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.salary && string(data.salary, "loaded")}
          </div>
        </div>
        {/* Annual Leave */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Annual Leave</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.annualLeave}
          </div>
        </div>
        {/* Accomodation */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Accomodation</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.accomodation}
          </div>
        </div>
        {/* health insurance */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Health Insurance</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.healthInsurance}
          </div>
        </div>
        {/* Driving License */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Driving License</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.drivingLicense}
          </div>
        </div>
        {/* Languages */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Languages</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.languages}
          </div>
        </div>
        {/* Joining Ticket */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Joining Ticket</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.joiningTicket ? "Provided" : "Not Provided"}
          </div>
        </div>
        {/* annualTicket */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Annual Ticket</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.annualTicket ? "Provided" : "Not Provided"}
          </div>
        </div>
        {/* Family Status */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Family Status</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.familyStatus}
          </div>
        </div>
        {/* Other Benefits */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Other Benefits</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {data.otherBenefits && string(data.otherBenefits, "loaded")}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JdViewData;
