import React, { lazy, Suspense } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
import ScrollToTop from "./ScrollToTop";

// Clients
const ClientLogin = lazy(() => import("../pages/Clients/ClientLogin"));
const ClientRegister = lazy(() => import("../pages/Clients/ClientRegister"));
const ClientDashBoard = lazy(() => import("../pages/Clients/ClientsDashBoard"));
const ClientJobOpenings = lazy(() =>
  import("../pages/Clients/ClientJobOpenings")
);
const ClientContacts = lazy(() => import("../pages/Clients/ClientContacts"));

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
const RecruitmentContacts = lazy(() =>
  import("../pages/Recruitment/RecruitmentContacts")
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
                <Route
                  path="/client/register"
                  element={<ClientRegister />}
                ></Route>
                <Route
                  path="/client/dashboard"
                  element={<ClientDashBoard />}
                ></Route>
                <Route
                  path="/client/jobs"
                  element={<ClientJobOpenings />}
                ></Route>
                <Route
                  path="/client/contacts"
                  element={<ClientContacts />}
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
                  path="/recruitment/contacts"
                  element={<RecruitmentContacts />}
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
