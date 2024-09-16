import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import Thumbnail from "./Thumbnail";

const SearchResultsGrid = ({ searchTerm, filteredData, onBookmark }) => {
  return (
    <Box w="full" px={{ base: "4", lg: "8" }} mt="8">
      <Text fontSize="2xl" fontWeight="bold" mb="4" color="contrast.200">
        Found {filteredData.length} results for '{searchTerm}'
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {filteredData.map((item) => (
          <GridItem key={item.id}>
            <Thumbnail
              h={{ base: "200px", lg: "250px" }}
              w="full"
              borderRadius="8px"
              imgUrl={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
              isTrending={false}
              title={item.title}
              year={item.release_date.split("-")[0]}
              genres={item.genre_ids || []}
              rating={item.vote_average.toFixed(1)}
              onBookmarkClick={() => onBookmark(item)}
              isBookMarked={false}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchResultsGrid;
