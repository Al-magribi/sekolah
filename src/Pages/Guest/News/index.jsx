import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Banner from "./Banner";
import Footer from "../Components/Footer";
import NewsItems from "./NewsItems";
import { useDispatch } from "react-redux";
import { getNews } from "../../../Redux/News/news_action";
import Title from "../../Title";

const News = () => {
  const dispatch = useDispatch();

  const name = "";

  useEffect(() => {
    dispatch(getNews(name));
  }, [dispatch, name]);

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Title title="Informasi" />
      <Navbar />

      <Banner />

      <Box
        sx={{
          minHeight: { xs: 692, md: 496 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NewsItems />
      </Box>

      <Footer />
    </Box>
  );
};

export default News;
