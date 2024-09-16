import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Thumbnail from "./Thumbnail";

const RecommendedGrid = ({ data, onBookmark }) => {
  return (
    <Flex direction="column" h="calc(100vh - 18rem)" pb="10" overflow="hidden">
      <Box
        flex="1"
        overflowY="auto"
        sx={{
          "&::-webkit-scrollbar": {
            width: "3px", // Customize the scrollbar width
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1", // Track color
            borderRadius: "10px", // Round track edges
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888", // Scrollbar thumb color
            borderRadius: "10px", // Round thumb edges
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555", // Thumb color on hover
          },
        }}
      >
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={2}
        >
          {data.map((item) => (
            <GridItem key={item.id}>
              <Thumbnail
                h={{ base: "200px", lg: "250px" }}
                w="95%"
                borderRadius="8px"
                imgUrl={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                isTrending={false}
                title={item.title}
                year={item.release_date.split("-")[0]}
                genres={item.genre_ids || []}
                rating={item.vote_average.toFixed(1)}
                onBookmarkClick={() => onBookmark(item)} // Consistent naming
                isBookMarked={true}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default RecommendedGrid;
