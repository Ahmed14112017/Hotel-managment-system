import { Box, Grid, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { AdvertismentData } from "../../interfaces";
import { ClipLoader } from "react-spinners";

export default function AdsOffer() {
  const NameHouses = ["Tabby Town", "Anggana", "Seattle Rain", "Wodden Pit"];
  const locatioofHouses = [
    "Gunung Batu, Indonesia",
    "Bogor, Indonesia",
    "Jakarta, Indonesia",
    "Wonosobo, Indonesia",
  ];
  const token = localStorage.getItem("token");
  const [Ads, SetAds] = useState<AdvertismentData[]>([]);
  const [loading, Setloading] = useState(false);
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
        ads
      </Typography>
      <Grid container spacing={2}>
        {Ads.slice(-4).map((item, index) => {
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
                    top: "2%",
                    right: "2%",
                    width: "100px",

                    backgroundColor: "#FF498B",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <Typography color="#fff">{`${item.room.discount}% Off`}</Typography>
                </Box>

                <img
                  src={`${item.room.images}`}
                  className="Ads-img"
                  width={"100%"}
                  style={{
                    objectFit: "cover",
                    minHeight: "200px",
                    borderRadius: "5px",
                  }}
                />
              </Box>
              <Box marginBlock={"10px"}>
                <Typography>{`${NameHouses[index]}`}</Typography>
                <Typography color="gray">{`${locatioofHouses[index]}`}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
