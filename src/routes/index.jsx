import React, { lazy, Suspense } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
import ScrollToTop from "./ScrollToTop";

// Clients
const ClientLogin = lazy(() => import("../pages/Clients/ClientLogin"));
const ClientRegister = lazy(() => import("../pages/Clients/ClientRegister"));
const ClientDashBoard = lazy(() => import("../pages/Clients/ClientsDashBoard"));

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
