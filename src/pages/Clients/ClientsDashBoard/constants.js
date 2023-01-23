import { MdWorkOutline } from "react-icons/md";
import { RiContactsBookLine } from "react-icons/ri";

export const cards = [
  {
    id: 1,
    icon: MdWorkOutline,
    title: "Job Openings",
    path: "/client/jobs",
    description: "Manage the job posting",
  },
  {
    id: 2,
    icon: RiContactsBookLine,
    title: "Contacts",
    path: "/client/contacts",
    description: "Manage the contact information",
  },
  {
    id: 3,
    icon: RiContactsBookLine,
    title: "CV Batches",
    path: "/uploadcv",
    description: "Manage the CV Batches",
    disabled: true,
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
