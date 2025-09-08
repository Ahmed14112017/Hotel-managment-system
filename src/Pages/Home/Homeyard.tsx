import { Box, Grid, Typography } from "@mui/material";

export default function Homeyard() {
  const ImagArray = [
    "/src/assets/pic (1).png",
    "/src/assets/pic (2).png",
    "/src/assets/pic.png",
    "/src/assets/Rectangle 3.png",
  ];
  const NameHouses = ["Tabby Town", "Anggana", "Seattle Rain", "Wodden Pit"];
  const locatioofHouses = [
    "Gunung Batu, Indonesia",
    "Bogor, Indonesia",
    "Jakarta, Indonesia",
    "Wonosobo, Indonesia",
  ];
  return (
    <>
      <Typography
        marginBlock={"10px"}
        variant="h4"
        component={"h3"}
        sx={{ fontSize: { xs: "30px" } }}
      >
        Houses with beauty backyard
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
