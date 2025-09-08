import { Container } from "@mui/material";
import Ads from "./MostPopularAds";
import Home from "./Home";
import Homeyard from "./Homeyard";
import HomeyardOther from "./HomeyardOther";
import AdsOffer from "./AdsOffer";
import Reviews from "./Reviews";

export default function MainHome() {
  return (
    <Container maxWidth={"lg"}>
      <Home />
      <Ads />
      <Homeyard />
      <HomeyardOther />
      <AdsOffer />
      <Reviews />
    </Container>
  );
}
