import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import LoginAdmin from '../pages/admin/Login';
import CompanyRegistration from '../pages/user/CompanyRegistration';
import AdminDashboard from '../pages/admin/Dashboard';
import UserDashboard from '../pages/user/Dashboard';
import SuperadminDashboard from '../pages/superadmin/Dashboard';
import SuperadminCompanies from '../pages/superadmin/CompaniesPage';
import AdminEmployeesPage from '../pages/admin/AdminEmployeesPage';
import ProtectedRoute from '../components/ProtectedRoute';
import EmployeePeers from '../pages/admin/EmployeePeers';
import EmployeeDirectReports from '../pages/admin/EmployeeDirectReports';


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/user/login" element={<CompanyRegistration />} />

        {/* Rotas protegidas */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <SuperadminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/superadmin/companies"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <SuperadminCompanies />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/employees" element={
          <ProtectedRoute requiredRole="admin">
            <AdminEmployeesPage />
          </ProtectedRoute>
        } />

        <Route
          path="/admin/employees/:company_id/:id/peers"
          element={
            <ProtectedRoute requiredRole="admin">
              <EmployeePeers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees/:companyId/:employeeId/peers"
          element={
            <ProtectedRoute requiredRole="admin">
              <EmployeePeers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees/:company_id/:id/peers"
          element={
            <ProtectedRoute requiredRole="admin">
              <EmployeePeers />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/employees/:company_id/:id/direct-reports" element={
          <ProtectedRoute requiredRole="admin">
            <EmployeeDirectReports />
          </ProtectedRoute>
        } />

      </Routes>

    </Router>
  );
}
