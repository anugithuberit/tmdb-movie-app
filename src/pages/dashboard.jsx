import { SearchIcon } from "@chakra-ui/icons";
import { Box, Icon, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import RecommendedGrid from "../components/Recommended";
import SearchResultsGrid from "../components/SearchResultsGrid";
import Trending from "../components/Trending";

export default function Dashboard() {
  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [filteredRecommended, setFilteredRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef();
  const toast = useToast(); // Initialize useToast
  const accountId = "21456152"; // TMDB Account ID
  const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTVkZWRmNjk1ZTdjZDVlZWUzMWU4NzE5MzBmMTM4ZiIsIm5iZiI6MTcyNDU5MTI4Ny45MjM2MzMsInN1YiI6IjY2YzUwYjc0NjRhODk3Y2JiNTcxMjU3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.18LNuL5-bSZD56cx16Go0xt78KuEzl0_wU2u5ER2dKw";

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const fetchTrendingAndRecommended = async () => {
    try {
      const [trendingResponse, recommendedResponse] = await Promise.all([
        axios.get("https://api.themoviedb.org/3/trending/all/day", {
          headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        }),
        axios.get("https://api.themoviedb.org/3/discover/movie", {
          headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        }),
      ]);

      setTrending(trendingResponse.data.results);
      const recommendedData = recommendedResponse.data.results.map((item) => ({
        ...item,
        isBookmarked: false,
      }));
      setRecommended(recommendedData);
      setFilteredRecommended(recommendedData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Failed to fetch data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingAndRecommended();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = recommended.filter((item) =>
      item.title.toLowerCase().includes(value)
    );

    setFilteredRecommended(filteredData);
  };

  const handleBookmark = async (item) => {
    try {
      const mediaType = item.title ? "movie" : "tv";

      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          media_type: mediaType,
          media_id: item.id,
          favorite: !item.isBookmarked,
        }),
      };

      const response = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/favorite`,
        options
      );

      const data = await response.json();

      if (data.success) {
        const updatedRecommended = recommended.map((rec) =>
          rec.id === item.id ? { ...rec, isBookmarked: !rec.isBookmarked } : rec
        );
        setRecommended(updatedRecommended);
        setFilteredRecommended(updatedRecommended);
        
        // Display success toast
        toast({
          title: "Success!",
          description: item.isBookmarked
            ? "Removed from bookmarks."
            : "Added to bookmarks.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error("Failed to update bookmark status");
      }
    } catch (err) {
      console.error("Failed to bookmark:", err);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Box>{error}</Box>;

  return (
    <Layout>
      <Box w="full" position="relative" mb="4">
        <Icon
          as={SearchIcon}
          color="gray.300"
          position="absolute"
          left="1rem"
          top="50%"
          transform="translateY(-50%)"
          cursor="pointer"
          onClick={handleIconClick}
        />
        <Input
          id="search-input"
          type="text"
          width="full"
          backgroundColor="transparent"
          paddingLeft="2.5rem"
          placeholder="Search for movies or TV series"
          border="none"
          color="contrast.200"
          _focus={{ border: "none", boxShadow: "none" }}
          ref={inputRef}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      {searchTerm ? (
        <SearchResultsGrid
          searchTerm={searchTerm}
          filteredData={filteredRecommended}
          onBookmark={handleBookmark}
        />
      ) : (
        <>
          <Trending data={trending} onBookmark={handleBookmark} />
          <Text
            fontWeight="medium"
            fontSize="lg"
            color="contrast.200"
            mt={4}
            ml={2}
          >
            Recommended
          </Text>
          <Box flexGrow={1} overflowY="hidden">
            <RecommendedGrid data={recommended} onBookmark={handleBookmark} />
          </Box>
        </>
      )}
    </Layout>
  );
}
