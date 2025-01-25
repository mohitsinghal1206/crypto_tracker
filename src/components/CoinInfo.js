import { LinearProgress, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

// No need to import styled anymore for basic styling
const Container = (props) => (
  <Box
    {...props}
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: "center",
    }}
  />
);

const Sidebar = (props) => (
  <Box
    {...props}
    sx={{
      width: { xs: "100%", md: "30%" },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    }}
  />
);

const Heading = (props) => (
  <Typography
    {...props}
    sx={{
      fontWeight: "bold",
      marginBottom: 2,
      fontFamily: "Montserrat",
    }}
  />
);

const Description = (props) => (
  <Typography
    {...props}
    sx={{
      width: "100%",
      fontFamily: "Montserrat",
      padding: "25px 25px 15px",
      textAlign: "justify",
    }}
  />
);

const MarketData = (props) => (
  <Box
    {...props}
    sx={{
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      display: { xs: "flex", sm: "block", md: "flex" },
      justifyContent: { sm: "center", md: "space-around" },
    }}
  />
);

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();

  // Fetch coin data with error handling
  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id), { timeout: 5000 });  // 5-second timeout
      setCoin(data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", error.response);
      } else if (error.request) {
        // No response received
        console.error("Error request:", error.request);
      } else {
        // General errors like Axios setup issues
        console.error("General Error:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currency]);

  // Show a loading indicator if coin data is not available yet
  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  const { name, image, description, market_cap_rank, market_data } = coin;

  return (
    <Container>
      <Sidebar>
        <img
          src={image.large}
          alt={name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Heading variant="h3">{name}</Heading>
        <Description variant="subtitle1">
          {description.en ? description.en.split(". ")[0] : "Description not available"}
        </Description>
        <MarketData>
          <Box sx={{ display: "flex" }}>
            <Heading variant="h5">Rank:</Heading>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {numberWithCommas(market_cap_rank)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Heading variant="h5">Current Price:</Heading>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Heading variant="h5">Market Cap:</Heading>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </Box>
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  );
};

export default CoinPage;
