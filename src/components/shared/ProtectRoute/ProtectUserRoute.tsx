import { jwtDecode } from "jwt-decode";
import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { MyToken } from "../../../interfaces";

export default function ProtectUserRoute({
  children,
}: {
  children: ReactNode;
}) {
  const token: any = localStorage.getItem("token");
  const decodedtoken = jwtDecode<MyToken>(token);
  console.log(decodedtoken);
  const location = useLocation();
  if (!token || decodedtoken.role !== "user") {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
