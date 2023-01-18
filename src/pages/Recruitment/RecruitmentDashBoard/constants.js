import jobOpeningsImage from "../../../images/job_openings.png";
import contactsImage from "../../../images/contacts.svg";
import batchesImage from "../../../images/batch.svg";
import interviewImage from "../../../images/interview.svg";
import resumeImage from "../../../images/resumes.svg";

export const cards = [
  {
    id: 1,
    icon: jobOpeningsImage,
    title: "Job Openings",
    path: "/recruitment/jobs",
  },
  {
    id: 2,
    icon: contactsImage,
    title: "Contacts",
    path: "/recruitment/contacts",
  },
  {
    id: 3,
    icon: batchesImage,
    title: "Clients",
    path: "/recruitment/clients",
  },
  {
    id: 4,
    icon: interviewImage,
    title: "Interview",
    path: "/recruitment/interviews",
  },
  {
    id: 5,
    icon: resumeImage,
    title: "Resumes",
    path: "/recruitment/resumes",
  },
];

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: {
    opacity: 0,
    y: "100px",
  },
  show: {
    opacity: 1,
    y: "0px",
    delay: 1,
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 9,
    },
  },
};
