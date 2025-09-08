import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Box, Typography } from "@mui/material";
const family = [
  {
    name: "Happy Family",
    rate: "/src/assets/Group 1.png",
    review:
      "What a great trip with my family and I should try again next time soon ...",
    image: "/src/assets/image 3.png",
    job: "Angga, Product Designer",
  },
  {
    name: "Happy Family",
    rate: "/src/assets/Group 1.png",
    review:
      "What a great trip with my family and I should try again next time soon ...",
    image: "/src/assets/image 3.png",
    job: "Angga, Product Designer",
  },
];
export default function Reviews() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      style={{ borderRadius: "12px", overflow: "hidden" }}
    >
      {family.map((rev) => {
        return (
          <SwiperSlide key={rev.name}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "12px",
                p: 3,

                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                color: "black",
                boxShadow: 3,
                justifyContent: { xs: "center", md: "space-between" },
                gap: "20px",
              }}
            >
              <Box>
                <Box
                  sx={{
                    position: { xs: "initial", md: "relative" },
                    display: { xs: "none", md: "block" },
                    width: "350px",
                    height: { xs: "0", md: "350px" },
                    top: "-20px",
                    left: "80px",
                    border: " 1px solid rgba(128,128,128,0.5)",
                    borderRadius: "10px",
                    zIndex: "50",
                  }}
                ></Box>
                <Box
                  sx={{
                    position: { xs: "initial", md: "absolute" },
                    width: { xs: "200px", md: "300px" },
                    height: { xs: "200px", md: "300px" },
                    left: { xs: "0", md: "170px" },
                    top: { xs: "0", md: "40px" },
                    zIndex: "100",
                  }}
                >
                  <Box
                    component={"img"}
                    src={rev.image}
                    alt={rev.name}
                    sx={{
                      width: { xs: "200px", md: "350px" },
                      height: { xs: "200px", md: "350px" },

                      borderRadius: "20px",
                      objectFit: "cover",
                      border: "4px solid white",
                      borderBottomRightRadius: "50px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ marginLeft: "160px" }}>
                <Typography variant="h6" fontWeight="bold">
                  {rev.name}
                </Typography>
                <img
                  src={rev.rate}
                  alt="rating"
                  style={{ margin: "8px 0" }}
                  loading="lazy"
                />
                <Typography
                  variant="h4"
                  component={"h4"}
                  color="text.secondary"
                >
                  {rev.review}
                </Typography>
                <Typography variant="body2" component={"p"} color="gray">
                  {rev.job}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
