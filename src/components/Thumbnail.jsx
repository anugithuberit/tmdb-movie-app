import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import Description from './Description';
import OutlinedBookmarkIcon from './Icons/OutlinedBookMarkIcon';


const Thumbnail = ({
  imgUrl,
  isTrending,
  title,
  year,
  genres,
  rating, 
  onBookmarkClick,
  isBookMarked,
  ...rest
}) => {
  return (
      <Box pos="relative" overflow="hidden" {...rest}>
          {isBookMarked && <Box
              pos="absolute"
              top="1rem"
              right="5%"
              borderRadius="50%"
              h="39px"
              w="39px"
              p="3"
              bgColor="#000"
              opacity={0.5}
              zIndex="1"
              onClick={onBookmarkClick} // Correctly named prop
          >
              <OutlinedBookmarkIcon />
          </Box>}
          <Image borderRadius='8px' src={imgUrl} alt={title} w="full" h={isTrending ? 'full' : "60%"} fit="100%" />
          {isTrending === true ? (
              <Box
                  pos={"absolute"}
                  left="0.8rem"
                  bottom="0.8rem"
                  p="2"
                  borderRadius="4px"
              >
                  <Description year={year} type="Movie" />
                  <Text fontWeight="semibold" ml="3" color="#fff">
                      {title}
                  </Text>
              </Box>
          ) : (
              <Box>
                  <Description year={year} type="Movie" />
                  <Text fontWeight="semibold" ml="3" color="#fff" >
                      {title}
                  </Text>
              </Box>
          )}
      </Box>
  );
};

export default Thumbnail
