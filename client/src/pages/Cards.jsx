import React from "react";
import {
  Text,
  Heading,
  CardBody,
  Card,
  Image,
  SimpleGrid,
  CardHeader,
  CardFooter,
  Badge,
} from "@chakra-ui/react";

const Cards = ({ catsData }) => {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      borderTop={"1px solid"}
    >
      {catsData?.map((item) => (
        <Card
          cursor={"pointer"}
          key={item._id}
          border={"1px solid "}
          marginTop={".5rem"}
        >
          <CardHeader>
            <Heading size="md">{item.name}</Heading>
            <Text>No of times clicked:{item.catCount}</Text>
          </CardHeader>
          <CardBody>
            <Image
              src={item.image}
              alt="Cat Cards"
              borderRadius="lg"
              w={"100%"}
              h={"200px"}
            />
          </CardBody>
          <CardFooter>
            <Badge variant="outline" colorScheme="green">
              {item.ageCategory}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Cards;
