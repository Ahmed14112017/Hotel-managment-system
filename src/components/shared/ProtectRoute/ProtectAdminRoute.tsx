import { jwtDecode } from "jwt-decode";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { MyToken } from "../../../interfaces";
export default function ProtectAdminRoute({
  children,
}: {
  children: ReactNode;
}) {
  const token: any = localStorage.getItem("token");
  const decodedtoken = jwtDecode<MyToken>(token);
  console.log(decodedtoken);
  const location = useLocation();
  if (!token) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  if (decodedtoken.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
