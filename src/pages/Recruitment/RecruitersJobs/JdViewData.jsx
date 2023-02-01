import { Divider, Modal } from "antd";
import React from "react";
import { removeUnderScore, string } from "../../../utilities";
import OmanJobsLogo from "../../../images/oj-small.png";
import "./recruitmentjobopenings.css";

const JdViewData = ({ data, setData, open, setOpen }) => {
  const status = (record) => {
    if (record.statusName === "pending")
      return (
        <div className="text-orange">{removeUnderScore(record.statusName)}</div>
      );
    if (record.statusName === "open")
      return (
        <div className="text-red">{removeUnderScore(record.statusName)}</div>
      );
    if (record.statusName === "close")
      return (
        <div className="text-green">{removeUnderScore(record.statusName)}</div>
      );
  };

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
            <div className="bold text-grey medium-text">
              {data.Jobdesignation}
            </div>
          </div>
          <div>
            <div className="bolder text-black">No of Vacancies</div>
            <div className="bold text-grey medium-text">
              {data.Jobvacancies}
            </div>
          </div>
          <div>
            <div className="bolder text-black">Job Status</div>
            <div className="bold text-grey medium-text">{status(data)}</div>
          </div>
        </div>
        {/* Job Role */}
        <div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black">Job Role</div>
          </Divider>
          <div className="bold text-grey text-padding-left">
            {data.JobJobRole}
          </div>
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
            {data.JobJobResponsibilities &&
              string(data.JobJobResponsibilities, "loaded")}
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
            {data.Jobeducation && string(data.Jobeducation, "loaded")}
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
            {data.Jobexperience && string(data.Jobexperience, "loaded")}
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
            {data.Jobskills && string(data.Jobskills, "loaded")}
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
            {data.Jobgender}
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
            {data.Jobnationality}
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
            {data.Jobage}
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
            {data.JobworkLocation}
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
            {data.Jobworkinghours && string(data.Jobworkinghours, "loaded")}
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
            {data.Jobsalary && string(data.Jobsalary, "loaded")}
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
            {data.JobannualLeave}
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
            {data.Jobaccomodation}
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
            {data.JobhealthInsurance}
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
            {data.JobdrivingLicense}
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
            {data.Joblanguages}
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
            {data.JobjoiningTicket ? "Provided" : "Not Provided"}
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
            {data.JobannualTicket ? "Provided" : "Not Provided"}
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
            {data.JobfamilyStatus}
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
            {data.JobotherBenefits && string(data.JobotherBenefits, "loaded")}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JdViewData;
