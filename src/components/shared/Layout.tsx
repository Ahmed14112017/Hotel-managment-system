import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </div>
  );
}
