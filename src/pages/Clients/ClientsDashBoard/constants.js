import jobOpeningsImage from "../../../images/job_openings.png";
import contactsImage from "../../../images/contacts.svg";
import batchesImage from "../../../images/batch.svg";

export const cards = [
  {
    id: 1,
    icon: jobOpeningsImage,
    title: "Job Openings",
    path: "/client/jobs",
  },
  {
    id: 2,
    icon: contactsImage,
    title: "Contacts",
    path: "/uploadcv",
  },
  {
    id: 3,
    icon: batchesImage,
    title: "CV Batches",
    path: "/uploadcv",
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
