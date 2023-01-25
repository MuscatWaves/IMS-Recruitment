import { MdWorkOutline } from "react-icons/md";
// import { RiContactsBookLine } from "react-icons/ri";
import { BsPersonBadge } from "react-icons/bs";
import { TbMessages } from "react-icons/tb";

export const cards = (user) => [
  {
    id: 1,
    icon: MdWorkOutline,
    title: "Job Openings",
    path: "/recruitment/jobs",
    description: "Manage the job posting",
  },
  // {
  //   id: 2,
  //   icon: RiContactsBookLine,
  //   title: "Contacts",
  //   path: "/recruitment/contacts",
  //   description: "Manage contact person information",
  // },
  {
    id: 3,
    icon: BsPersonBadge,
    title: "Clients",
    path: "/recruitment/clients",
    description: "Manage client information",
    disabled: !user.isHead,
  },
  {
    id: 4,
    icon: TbMessages,
    title: "Interview",
    path: "/recruitment/interviews",
    description: "Manage interview information",
    disabled: !user.isHead,
  },
  {
    id: 5,
    icon: MdWorkOutline,
    title: "Resumes",
    path: "/recruitment/resumes",
    disabled: !user.isHead,
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
