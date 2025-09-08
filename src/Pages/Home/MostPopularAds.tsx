import { Box, Grid, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { AdvertismentData } from "../../interfaces";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toast } from "react-toastify";

export default function Ads() {
  const token = localStorage.getItem("token");
  const [Ads, SetAds] = useState<AdvertismentData[]>([]);
  const [loading, Setloading] = useState(false);
  const navigate = useNavigate();
  const getAllAds = async () => {
    Setloading(true);
    try {
      const res = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/portal/ads",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      SetAds(res.data.data.ads);

      Setloading(false);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.message);
      Setloading(false);
    }
    Setloading(false);
  };
  console.log(Ads);
  const addtofavorite = async (roomId: string) => {
    try {
      const res = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms",
        { roomId: roomId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      console.log(res);
      navigate(`/favorite`);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAds();
  }, []);
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
    <Box component={"section"} sx={{ marginBlock: "20px" }}>
      <Typography variant="h3" component={"h3"} marginBlock={"20px"}>
        Most popular ads
      </Typography>
      <Grid container spacing={2}>
        {Ads.map((item) => {
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
                  <Typography color="#fff">{`${item.room.price} per night`}</Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "10%",
                    left: "10%",
                    padding: "10px",
                  }}
                >
                  <Typography color="#fff">{`${item.room.roomNumber}`}</Typography>
                </Box>
                <img
                  src={`${item.room.images}`}
                  className="Ads-img"
                  width={"100%"}
                  loading="lazy"
                  style={{
                    objectFit: "cover",
                    minHeight: "200px",
                    borderRadius: "5px",
                  }}
                />
                <Box
                  className="hoverIcon"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(0.8)",
                    transition: "all 0.3s ease",
                    opacity: 0,
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.2)",
                    borderRadius: "30px",
                    cursor: "pointer",
                    p: 1.5,
                  }}
                >
                  <VisibilityIcon
                    fontSize="large"
                    onClick={() => navigate(`/room/${item.room._id}`)}
                  />
                  <FavoriteBorderIcon
                    fontSize="large"
                    onClick={() => {
                      navigate(`/favorite`);
                      addtofavorite(item.room._id);
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
