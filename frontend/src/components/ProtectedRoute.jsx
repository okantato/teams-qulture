// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

export default function ProtectedRoute({ children, requiredRole }) {
  const user = useUserStore((state) => state.user);

  if (!user) return <Navigate to="/" replace />;

  const rolePermissions = {
    superadmin: user.superadmin,
    admin: user.superadmin || user.admin, // Superadmin também pode ver rotas de admin
    user: !user.superadmin && !user.admin, // usuário comum
  };

  const hasAccess = rolePermissions[requiredRole];

  if (!hasAccess) return <Navigate to="/" replace />;

  return children;
}
