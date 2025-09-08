import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/shared/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import VerifyAccount from "./components/auth/VerifyAccount";
import RestPassword from "./components/auth/RestPassword";
import Forgetpassword from "./components/auth/Forgetpassword";
// import {
//   Box,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
import { ToastContainer } from "react-toastify";
import MasterLayout from "./components/shared/MasterLayout/MasterLayout";
import Rooms from "./components/Rooms";
import RoomData from "./components/Rooms/RoomData";
import Facility from "./components/Facility";
import Advertisement from "./components/advertisement/Advertisement";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectAdminRoute from "./components/shared/ProtectRoute/ProtectAdminRoute";
import HomeLayout from "./components/shared/HomeLayout/HomeLayout";
import Listbooks from "./components/Listbooks/Listbooks";
import ListUsers from "./components/ListUsers/ListUsers";
import { createTheme } from "@mui/material";
import Explore from "./Pages/Explore";
import MainHome from "./Pages/Home/MainHome";
import RoomDetails from "./Pages/RoomDetails";
import Favorite from "./Pages/Favorite";
import Booking from "./Pages/Booking";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
export const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});
function App() {
  // const { mode, setMode } = useColorScheme();
  // if (!mode) {
  //   return null;
  // }
  const stripePromise = loadStripe(
    "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
  );

  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Login />,
        },

        {
          path: "register",
          element: <Register />,
        },
        { path: "forget-password", element: <Forgetpassword /> },
        {
          path: "verify-account",
          element: <VerifyAccount />,
        },
        {
          path: "reset-password",
          element: <RestPassword />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectAdminRoute>
          <MasterLayout />
        </ProtectAdminRoute>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "rooms", element: <Rooms /> },
        { path: "rooms/AddRooms", element: <RoomData /> },
        { path: "rooms/:id", element: <RoomData /> },
        { path: "Facility", element: <Facility /> },
        { path: "Advertisement", element: <Advertisement /> },
        { path: "Listbooks", element: <Listbooks /> },
        { path: "Listusers", element: <ListUsers /> },
      ],
    },
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { index: true, element: <MainHome /> },
        { path: "home", element: <MainHome /> },
        { path: "explore", element: <Explore /> },
        { path: "explore/:startDate/:endDate", element: <Explore /> },
        { path: "room/:id", element: <RoomDetails /> },
        { path: "favorite", element: <Favorite /> },

        {
          path: "booking/:id",
          element: (
            <Elements stripe={stripePromise}>
              <Booking />
            </Elements>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer />
      {/* <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "start",
          justifyContent: "end",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
          minHeight: "56px",
        }}
      >
        <FormControl>
          <FormLabel id="demo-theme-toggle">Theme</FormLabel>
          <RadioGroup
            aria-labelledby="demo-theme-toggle"
            name="theme-toggle"
            row
            value={mode}
            onChange={(event) =>
              setMode(event.target.value as "light" | "dark")
            }
          >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>
        </FormControl>
      </Box> */}
    </>
  );
}

export default App;
