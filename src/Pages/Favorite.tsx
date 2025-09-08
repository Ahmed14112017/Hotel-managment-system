import { Box, Container, Grid, Typography } from "@mui/material";
import PaginationControlled from "../ui/Pagination";
import type { IFavorite } from "../interfaces";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ClipLoader } from "react-spinners";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Favorite() {
  const [loading, Setloading] = useState(false);
  const [FavoriteRoom, SetFavoriteRoom] = useState<IFavorite[]>([]);
  const [totalCount, SettotalCount] = useState<number>(1);
  const [page, setPage] = useState(1);
  const pagesize: number = 9;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setPage(value);
  };
  const getFavoriteroom = async () => {
    Setloading(true);
    try {
      const res = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page: page,
            size: pagesize,
          },
        }
      );
      SetFavoriteRoom(res.data.data.favoriteRooms);

      console.log(res.data);
      SettotalCount(res.data.data.totalCount);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      Setloading(false);
    }
    Setloading(false);
  };
  const removeformfavorite = async (roomId: string, favoriteid: string) => {
    try {
      const res = await axios.delete(
        `https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms/${favoriteid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { roomId },
        }
      );
      getFavoriteroom();
      console.log(res);
      toast.success(res.data.message);
      navigate("/favorite");
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  };
  useEffect(() => {
    getFavoriteroom();
  }, [page]);
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
          Favorite Room{" "}
        </Typography>
        <Typography variant="body2" fontSize={"20px"}>
          All Rooms
        </Typography>
        <Grid container spacing={2} padding="20px">
          {FavoriteRoom?.map((item) =>
            item.rooms.map((dataroom) => (
              <Grid
                key={dataroom._id}
                size={{ xs: 12, md: 6, lg: 3 }}
                sx={{ overflow: "hidden", borderRadius: "20px" }}
              >
                <Box
                  className="box-img"
                  sx={{
                    position: "relative",
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "5%",
                      right: "5%",
                      backgroundColor: "#FF498B",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <Typography color="#fff">
                      {dataroom.price} EGP / night
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "10%",
                      left: "10%",
                      padding: "10px",
                      backgroundColor: "rgba(0,0,0,0.4)",
                      borderRadius: "6px",
                    }}
                  >
                    <Typography color="#fff">
                      Room {dataroom.roomNumber}
                    </Typography>
                  </Box>
                  <Box
                    className="hoverIcon"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) scale(0.8)",
                      opacity: 0,
                      transition: "all 0.3s ease",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.2)",
                      borderRadius: "30px",
                      cursor: "pointer",
                    }}
                  >
                    <VisibilityIcon
                      fontSize="large"
                      onClick={() => navigate(`/room/${dataroom._id}`)}
                    />
                    <FavoriteBorderIcon
                      fontSize="large"
                      onClick={() => {
                        removeformfavorite(item._id, dataroom._id);
                      }}
                    />
                  </Box>
                  <img
                    src={dataroom.images[0]}
                    alt={`Room ${dataroom.roomNumber}`}
                    loading="lazy"
                    className="Ads-img"
                    width="100%"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      borderRadius: "5px",
                    }}
                  />
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
      <Box textAlign={"center"} display={"flex"} justifyContent={"center"}>
        <PaginationControlled
          handleChange={handleChange}
          page={page}
          totalCount={totalCount / pagesize}
        />
      </Box>
    </Container>
  );
}
