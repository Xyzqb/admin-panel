import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import CompanyContactList from "../Pages/Companies/CompanyContactList";
import AddEditContact from "../Pages/Companies/AddEditContact";
import AddNewCompany from "../Pages/Companies/AddNewCompany";
// import ShowAllCompany from "../Pages/Companies/ShowAllCompany";
import AdminDetails from "../Pages/admins/AdminDetails";
// import AgentsPage from "../Pages/Agents/AgentsPage";
import AgentProfile from "../Pages/Agents/AgentProfile";
import KycDetails from "../Pages/Companies/KycDetails";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PrivateRoute from "../components/PrivateRoute";

// Teams
import TeamsMember from "../Pages/Teams/TeamsMember";
import TeamsPage from "../Pages/Teams/TeamsPage";

// WebHooks
import LogDetails from "../Pages/webhooks/LogDetails";

function AppLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        background: "#1e293b",
      }}
    >
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: 16 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />

            {/* Agents */}
            <Route path="/agents/profile" element={<AgentProfile />} />

            {/* Companies */}
            <Route path="companies/contact-list" element={<CompanyContactList />} />
            <Route path="companies/add-edit-contact" element={<AddEditContact />} />
            <Route path="companies/add-new-company" element={<AddNewCompany />} />
            <Route path="companies/kyc-details" element={<KycDetails />} />

            {/* Admins */}
            <Route path="admins/admin-details" element={<AdminDetails />} />

            {/* Teams */}
            <Route path="Teams/teams-page" element={<TeamsPage />} />
            <Route path="Teams/teams-member" element={<TeamsMember />} />

            {/* WebHook */}
            <Route path="WebHook/log-details" element={<LogDetails />} />
          </Route>
        </Route>

        {/* Fallback for unknown public routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
