import { Flex, useBreakpointValue } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  const isBelowLg = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex direction={isBelowLg ? "column" : "row"} h="100vh" overflow="hidden">
      <Sidebar />
      <Flex direction="column" flexGrow={1} p="5" overflow="hidden">
        {children}
      </Flex>
    </Flex>
  );
}
