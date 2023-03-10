import React, { lazy, Suspense } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
import ScrollToTop from "./ScrollToTop";

// Clients
const ClientLogin = lazy(() => import("../pages/Clients/ClientLogin"));
// const ClientRegister = lazy(() => import("../pages/Clients/ClientRegister"));
const ClientDashBoard = lazy(() => import("../pages/Clients/ClientsDashBoard"));
const ClientJobOpenings = lazy(() =>
  import("../pages/Clients/ClientJobOpenings")
);
const ClientCVPreBatch = lazy(() =>
  import("../pages/Clients/ClientBatch/clientPreScreenBatch.jsx")
);
const ClientBatch = lazy(() => import("../pages/Clients/ClientBatch"));
// const ClientContacts = lazy(() => import("../pages/Clients/ClientContacts"));

// Recruitment
const RecruitmentLogin = lazy(() =>
  import("../pages/Recruitment/RecruitmentLogin")
);
const RecruitmentDashboard = lazy(() =>
  import("../pages/Recruitment/RecruitmentDashBoard")
);
const RecruitmentJobOpenings = lazy(() =>
  import("../pages/Recruitment/RecruitmentJobOpenings")
);
const RecruiterJobs = lazy(() => import("../pages/Recruitment/RecruitersJobs"));
// const RecruitmentContacts = lazy(() =>
//   import("../pages/Recruitment/RecruitmentContacts")
// );
const RecruitmentClients = lazy(() =>
  import("../pages/Recruitment/RecruitmentClients")
);
const RecruitmentInterviews = lazy(() =>
  import("../pages/Recruitment/RecruitmentInterviews")
);
const RecruitmentCVParsing = lazy(() =>
  import("../pages/Recruitment/RecruitmentCVParsing")
);
const RecruitmentClientInformation = lazy(() =>
  import("../pages/Recruitment/RecruitmentClientInformation")
);
const RecruitmentJobAssignment = lazy(() =>
  import("../pages/Recruitment/RecruitmentJobAssignment")
);
const RecruitmentCVBatch = lazy(() =>
  import("../pages/Recruitment/RecruitmentCVBatch")
);
const RecruitmentMultipleCVBatch = lazy(() =>
  import("../pages/Recruitment/RecruitmentCVBatch/batchCreateMultiple.jsx")
);

// Misc
const PageNotFound = lazy(() => import("../components/NoPageFound"));
const NotAuthorize = lazy(() => import("../components/NotAuthorize"));

const Routing = () => {
  return (
    <div>
      <Suspense fallback={<Loader minHeight={"80vh"} />}>
        <Router>
          <AnimatePresence>
            <LazyMotion features={domAnimation}>
              <ScrollToTop />
              <Routes>
                {/* Clients */}
                <Route path="/client" element={<ClientLogin />}></Route>
                {/* <Route
                  path="/client/register"
                  element={<ClientRegister />}
                ></Route> */}
                {/* <Route
                    path="/client/contacts"
                    element={<ClientContacts />}
                  ></Route> */}
                <Route
                  path="/client/dashboard"
                  element={<ClientDashBoard />}
                ></Route>
                <Route
                  path="/client/jobs"
                  element={<ClientJobOpenings />}
                ></Route>
                <Route
                  path="/client/batch/prescreen"
                  element={<ClientCVPreBatch />}
                ></Route>
                <Route
                  path="/client/batch/:jobId/:jobName"
                  element={<ClientBatch />}
                ></Route>
                {/* Recruitment */}
                <Route
                  path="/recruitment"
                  element={<RecruitmentLogin />}
                ></Route>
                <Route
                  path="/recruitment/dashboard"
                  element={<RecruitmentDashboard />}
                ></Route>
                <Route
                  path="/recruitment/jobs"
                  element={<RecruitmentJobOpenings />}
                ></Route>
                <Route
                  path="/recruiter/jobs"
                  element={<RecruiterJobs />}
                ></Route>
                {/* <Route
                  path="/recruitment/contacts"
                  element={<RecruitmentContacts />}
                ></Route> */}
                <Route
                  path="/recruitment/clients"
                  element={<RecruitmentClients />}
                ></Route>
                <Route
                  path="/recruitment/interviews"
                  element={<RecruitmentInterviews />}
                ></Route>
                <Route
                  path="/recruitment/resumes"
                  element={<RecruitmentCVParsing />}
                ></Route>
                <Route
                  path="/recruitment/clientInformation"
                  element={<RecruitmentClientInformation />}
                ></Route>
                <Route
                  path="/recruitment/jobAssignment"
                  element={<RecruitmentJobAssignment />}
                ></Route>
                <Route
                  path="/recruitment/cvBatch"
                  element={<RecruitmentCVBatch />}
                ></Route>
                <Route
                  path="/recruitment/create/multipleCvBatch"
                  element={<RecruitmentMultipleCVBatch />}
                ></Route>
                {/* Misc */}
                <Route path="/notAuthorized" element={<NotAuthorize />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
            </LazyMotion>
          </AnimatePresence>
        </Router>
      </Suspense>
    </div>
  );
};

export default Routing;
