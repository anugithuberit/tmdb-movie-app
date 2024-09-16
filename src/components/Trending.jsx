import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Thumbnail from "./Thumbnail";

export default function Trending({ data, onBookmark }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    slidesToShow: 3, // Default for larger screens
    responsive: [
      {
        breakpoint: 1024, // For screens less than or equal to 1024px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // For screens less than or equal to 768px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For screens less than or equal to 480px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box width="100%">
      <Text fontWeight="medium" fontSize="lg" mb="2" color="contrast.200">
        Trending
      </Text>
      <Slider {...settings} style={{ width: "100%" }}>
        {data.map((item) => (
          <Box key={item.id}>
            <Thumbnail
              w="95%"
              h='180px'
              borderRadius='8px'
              mr="20px"
              imgUrl={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
              isTrending={true} // Example condition; set accordingly
              title={item.title}
              year={item.release_date ? item.release_date.split("-")[0] : "Unknown"} // Check for undefined
              genres={item.genre_ids || []} // Map genre IDs to names if available
              rating={item.vote_average ? item.vote_average.toFixed(1) : "N/A"} // Check for undefined
              isBookMarked={true}
              onBookmarkClick={() => onBookmark(item)}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
