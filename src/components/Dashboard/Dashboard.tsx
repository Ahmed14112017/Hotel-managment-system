import { Box, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Dashboarddata } from "../../interfaces";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [dashboarddata, Setdashboarddata] = useState<Dashboarddata | null>(
    null
  );

  const token = localStorage.getItem("token");
  const getdashboarddata = async () => {
    const res = await axios.get(
      `https://upskilling-egypt.com:3000/api/v0/admin/dashboard`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    Setdashboarddata(res.data.data);
  };

  useEffect(() => {
    getdashboarddata();
  }, []);
  const data = {
    labels: ["Rooms", "ads", "facilities"],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          dashboarddata?.rooms,
          dashboarddata?.ads,
          dashboarddata?.facilities,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          color: "white",
          gap: "10px",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1A1B1E",
            flex: 1,
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              {" "}
              {dashboarddata?.rooms}
              <Typography>rooms</Typography>
            </Box>
            <FolderOpenIcon sx={{ color: "#203FC7" }} />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#1A1B1E",
            flex: 1,
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              {" "}
              {dashboarddata?.facilities}
              <Typography>facilities</Typography>
            </Box>

            <FolderOpenIcon sx={{ color: "#203FC7" }} />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#1A1B1E",
            flex: 1,
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              {" "}
              {dashboarddata?.ads}
              <Typography>ads</Typography>
            </Box>

            <FolderOpenIcon sx={{ color: "#203FC7" }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "400px", margin: "auto" }}>
        {dashboarddata ? <Doughnut data={data} /> : <p>Loading dashboard...</p>}
      </Box>
    </Box>
  );
}
