import { Box, Button, Stack, Typography } from "@mui/material";
import Calender, { type DateRangeState } from "../../ui/Calender";
import { useState } from "react";
import { addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import Capacity from "../../ui/Capacity";

export default function Home() {
  const [range, setRange] = useState<DateRangeState[]>([
    {
      startDate: new Date(2025, 0, 1),
      endDate: addDays(new Date(2025, 0, 1), 7),
      key: "selection",
    },
  ]);
  const [open, Setopen] = useState(false);
  const Opencalender = () => {
    Setopen(!open);
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    const startDate = range[0].startDate?.toISOString();
    const endDate = range[0].endDate?.toISOString();

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    navigate(`/explore?startDate=${startDate}&endDate=${endDate}`);
  };
  const [value, Setvalue] = useState(0);
  const Addvalue = () => {
    Setvalue(value + 1);
  };
  const muinsvalue = () => {
    Setvalue(value - 1);
  };
  return (
    <>
      <Stack
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        marginBlock={"20px"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Box width={{ xs: "100%", md: "50%" }}>
            <Typography
              variant="h2"
              component={"h1"}
              sx={{ fontFamily: "900", fontSize: "60px", color: "#152C5B" }}
            >
              Forget Busy Work, Start Next Vacation
            </Typography>
            <Typography sx={{ color: "#B0B0B0", marginBlock: "10px" }}>
              We provide what you need to enjoy your holiday with family. Time
              to make another memorable moments.
            </Typography>
            <Button
              variant="outlined"
              onClick={Opencalender}
              sx={{ marginTop: "20px" }}
            >
              Pick a Date
            </Button>
            {open && (
              <Calender
                handleSubmit={handleSubmit}
                range={range}
                setRange={setRange}
                open={open}
                Opencalender={Opencalender}
                closecalender={Opencalender}
                children="explore"
              />
            )}
          </Box>
          <Box
            width={{ md: "50%" }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <img src="\src\assets\banner.png" width={"100%"} />
          </Box>
        </Box>
      </Stack>
      <Capacity
        Addperson={Addvalue}
        muinsperson={muinsvalue}
        value={value}
        setvalue={Setvalue}
      />
    </>
  );
}
