import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import Thumbnail from "./Thumbnail";

const BookmarkGrid = ({ movies, tvSeries }) => {
  
  return (
    <Flex direction="column" h="100vh" pb="10" overflow="hidden">
      <Box flex="1" overflowY="auto">
        {/* Bookmarked Movies Section */}
        <Text fontWeight="medium" fontSize="lg" color="contrast.200" mb={4}>
          Bookmarked Movies
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={4}
        >
          {movies.map((item) => (
            <GridItem key={item.id}>
              <Thumbnail
                h={{ base: "200px", lg: "250px" }}
                w="100%"
                borderRadius="8px"
                imgUrl={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                isTrending={false}
                title={item.title}
                year={item.release_date.split("-")[0]}
                genres={item.genre_ids || []}
                rating={item.vote_average.toFixed(1)}
              />
            </GridItem>
          ))}
        </Grid>

        {/* Bookmarked TV Series Section */}
        {tvSeries.length > 0 && (
          <Box>
            <Text
              fontWeight="medium"
              fontSize="lg"
              color="contrast.200"
              mt={8}
              mb={4}
            >
              Bookmarked TV Series
            </Text>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={4}
            >
              {tvSeries.map((item) => (
                <GridItem key={item.id}>
                  <Thumbnail
                    h={{ base: "150px", lg: "200px" }}
                    w="100%"
                    borderRadius="8px"
                    imgUrl={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                    isTrending={false}
                    title={item.title}
                    year={item.first_air_date.split("-")[0]}
                    genres={item.genre_ids || []}
                    rating={item.vote_average.toFixed(1)}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default BookmarkGrid;
