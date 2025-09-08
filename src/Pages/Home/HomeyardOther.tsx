import { Box, Grid, Typography } from "@mui/material";
import img1 from "../../assets/pic (1).png";
import img2 from "../../assets/pic (2).png";
import img from "../../assets/pic.png";
import Rectangle from "../../assets/Rectangle 3.png";
export default function Homeyard() {
  const ImagArray = [img1, img2, img, Rectangle];
  const NameHouses = ["Wodden Pit", "Seattle Rain", "Anggana", "Tabby Town"];
  const locatioofHouses = [
    "Wonosobo, Indonesia",
    "Jakarta, Indonesia",
    "Bogor, Indonesia",
    "Gunung Batu, Indonesia",
  ];
  return (
    <>
      <Typography
        marginBlock={"10px"}
        variant="h4"
        component={"h3"}
        sx={{ fontSize: { xs: "30px" } }}
      >
        Hotels with large living room
      </Typography>
      <Grid container spacing={2}>
        {ImagArray.map((img, index) => (
          <Grid key={img} size={{ xs: 6, md: 3 }}>
            <Box sx={{ width: "100%" }}>
              <img src={img} width={"100%"} loading="lazy" />
              <Typography sx={{ marginBlock: "5px" }}>
                {NameHouses[index]}
              </Typography>
              <Typography sx={{ marginBlock: "5px", color: "gray" }}>
                {locatioofHouses[index]}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
