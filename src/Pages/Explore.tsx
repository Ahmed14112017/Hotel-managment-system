import { Box, Container, Grid, Typography } from "@mui/material";
import type { AxiosError } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import type { IRoom } from "../interfaces";
import { useSearchParams } from "react-router-dom";
import PaginationControlled from "../ui/Pagination";

export default function Explore() {
  const [loading, Setloading] = useState(false);
  const [ExploreRoom, SetExploreRoom] = useState<IRoom[]>([]);
  const token = localStorage.getItem("token");
  const [searchparam] = useSearchParams();
  const startDate = searchparam.get("startDate");
  const endDate = searchparam.get("endDate");
  const [page, setPage] = useState(1);
  const [totalCount, SettotalCount] = useState<number>(1);
  const pagesize: number = 9;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setPage(value);
  };
  const getRoomExplore = async () => {
    Setloading(true);
    try {
      const res = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/portal/rooms/available",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page: page,
            size: pagesize,
            startDate: startDate || "2025-01-20",
            endDate: endDate || "2025-12-30",
          },
        }
      );
      SetExploreRoom(res.data.data.rooms);
      SettotalCount(res.data.data.totalCount / pagesize);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      Setloading(false);
    }
    Setloading(false);
  };
  useEffect(() => {
    getRoomExplore();
  }, [page, startDate, endDate]);
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader
          color={"#000"}
          loading={loading}
          size={"200px"}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Box>
    );
  }
  return (
    <Container maxWidth={"lg"}>
      <Box>
        <Typography
          variant="h2"
          color="#152C5B"
          component={"h2"}
          textAlign={"center"}
        >
          Explore ALL Rooms{" "}
        </Typography>
        <Typography variant="body2" fontSize={"20px"}>
          All Rooms
        </Typography>
        <Grid container spacing={2} padding={"20px"}>
          {ExploreRoom?.map((item) => {
            return (
              <Grid
                key={item._id}
                size={{ xs: 12, md: 6, lg: 3 }}
                sx={{ overflow: "hidden", position: "relative" }}
              >
                <Box
                  className="box-img"
                  sx={{
                    position: "relative",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "5%",
                      right: "5%",
                      width: "150px",

                      backgroundColor: "#FF498B",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <Typography color="#fff">{`${item.price} per night`}</Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "10%",
                      left: "10%",
                      padding: "10px",
                    }}
                  >
                    <Typography color="#fff">{`${item.roomNumber}`}</Typography>
                  </Box>
                  <img
                    src={`${item.images}`}
                    className="Ads-img"
                    width={"100%"}
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      borderRadius: "5px",
                    }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box textAlign={"center"} display={"flex"} justifyContent={"center"}>
        <PaginationControlled
          handleChange={handleChange}
          page={page}
          totalCount={totalCount}
        />
      </Box>
    </Container>
  );
}
