import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Bookmark from "./pages/bookMarks";
import Dashboard from "./pages/dashboard";
import theme from "./styles/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookmarks" element={<Bookmark />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
