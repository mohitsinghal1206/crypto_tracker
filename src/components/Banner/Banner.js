import { Container, Typography, styled } from "@mui/material";  // Use styled from MUI v6
import Carousel from "./Carousel";

// Styled Box to replace div
const BannerBox = styled("div")({
  backgroundImage: "url(./banner2.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const BannerContainer = styled(Container)({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
});

const BannerText = styled("div")({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

export default function Banner() {
  return (
    <BannerBox>
      <BannerContainer>
        <BannerText>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </BannerText>
        <Carousel />
      </BannerContainer>
    </BannerBox>
  );
}
