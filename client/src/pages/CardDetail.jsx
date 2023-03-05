import React, { useEffect, useState } from "react";
import { Text, Stack, Heading, CardBody, Card, Image } from "@chakra-ui/react";
// import { useRef } from "react";
const CardDetail = ({
  data,
  setActiveInNav,
  setCatsData,
  getData,
  activeInNav,
}) => {
  const [increseCount, setIncreaseCount] = useState(data.catCount);
  // const ref=useRef(null)
  useEffect(() => {
    setIncreaseCount(data.catCount);
  }, [data]);

  //
  const updatingCatCount = async () => {
    try {
      fetch(`http://localhost:8080/cats/update/${data._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          image: data.image,
          catCount: increseCount + 1, //beacuse state is one step behiend
          // catCount:ref?.current
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  //
  const updatedCatCount = () => {
    setIncreaseCount(increseCount + 1);
    // ref.current=increseCount+1
    updatingCatCount().then(() => {
      setTimeout(() => {
        getData().then((res) => {
          setCatsData(res);
          setActiveInNav({
            ...activeInNav,
            activeCat: res[activeInNav?.index],
          });
        });
      }, 100);
    });
  };
  return (
    <>
      <Card maxW="sm" onClick={updatedCatCount}>
        <CardBody style={{ cursor: "pointer" }}>
          <Heading size="md">{data.name}</Heading>
          <Text>No of times clicked:{increseCount}</Text>
          <Image
            w={"100%"}
            h={"300px"}
            src={data.image}
            alt="cat pic"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Text fontSize="l">{data.nickName}</Text>
            <Text color="blue.600" fontSize="l">
              {data.ageCategory}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default CardDetail;
