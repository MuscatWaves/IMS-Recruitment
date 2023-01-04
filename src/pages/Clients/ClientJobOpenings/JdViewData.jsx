import { Divider, Modal } from "antd";
import React from "react";
import { string } from "../../../utilities";
import "./clientjobopenings.css";

const JdViewData = ({ data, setData, open, setOpen }) => {
  return (
    <Modal
      title="JD"
      open={open}
      footer={false}
      onCancel={() => {
        setOpen(false);
        setData(null);
      }}
      centered
      width={1000}
    >
      <div className="flex-gap-column">
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
      </div>
    </Modal>
  );
};

export default JdViewData;
