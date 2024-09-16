import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookmarkGrid from "../components/BookmarkGrid";
import Layout from "../components/Layout";

const Bookmark = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedTVSeries, setBookmarkedTVSeries] = useState([]);
  
  const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTVkZWRmNjk1ZTdjZDVlZWUzMWU4NzE5MzBmMTM4ZiIsIm5iZiI6MTcyNDU5MTI4Ny45MjM2MzMsInN1YiI6IjY2YzUwYjc0NjRhODk3Y2JiNTcxMjU3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.18LNuL5-bSZD56cx16Go0xt78KuEzl0_wU2u5ER2dKw'; // Replace with your actual Bearer token
  const accountId = '21456152'; // Replace with your actual account ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieOptions = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${BEARER_TOKEN}`
          }
        };

        const tvOptions = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${BEARER_TOKEN}`
          }
        };

        const moviesResponse = await axios.get(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
          movieOptions
        );

        const tvSeriesResponse = await axios.get(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/tv?language=en-US&page=1&sort_by=created_at.asc`,
          tvOptions
        );

        setBookmarkedMovies(moviesResponse.data.results);
        setBookmarkedTVSeries(tvSeriesResponse.data.results);
      } catch (error) {
        console.error("Error fetching bookmarked data:", error);
      }
    };

    fetchData();
  }, [BEARER_TOKEN, accountId]);

  return (
    <Layout>
      <Box w='full' pos='relative'>
        <BookmarkGrid movies={bookmarkedMovies} tvSeries={bookmarkedTVSeries} />
      </Box>
    </Layout>
  );
};

export default Bookmark;
