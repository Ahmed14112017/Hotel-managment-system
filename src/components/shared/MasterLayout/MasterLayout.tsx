import { Outlet } from "react-router-dom";
import Sidbar from "../Sidbar/Sidbar";
export default function MasterLayout() {
  return (
    <div>
      <Sidbar>
        <Outlet />
      </Sidbar>
    </div>
  );
}
