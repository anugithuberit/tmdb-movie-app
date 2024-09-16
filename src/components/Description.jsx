import {
    Box,
    Flex,
    ListItem,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import ReelIcon from "./Icons/reelIcon";

const Description = ({ year, type, title }) => {
    const items = [
        { label: year, icon: null, showDot: false },
        { label: type, icon: <ReelIcon />, showDot: true },
    ];

    return (
        <Box>
            <UnorderedList display="flex" styleType="none" mb={1} p={0} fontSize='xs' color='grey.500'>
                {items.map((item, index) => (
                    <ListItem key={index} display="flex" alignItems="center" mr={4}>
                        {item.showDot && (
                            <Box
                                as="span"
                                width="8px"
                                height="8px"
                                borderRadius="50%"
                                bg="currentColor"
                                mr={2}
                            />
                        )}
                        <Flex alignItems="center">
                            {item.icon && <Box mr={2}>{item.icon}</Box>}
                            <Box>{item.label}</Box>
                        </Flex>
                    </ListItem>
                ))}
            </UnorderedList>
            <Text fontWeight="semibold" ml="4">
                {title}
            </Text>
        </Box>
    );
};

export default Description;
