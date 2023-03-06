import React, { useEffect, useState } from "react";
import { Box, VStack, Tag, Divider } from "@chakra-ui/react";
import CardDetail from "./CardDetail";
import Form from "./Form";
import Cards from "./Cards";

const getData = async () => {
  let res = await fetch(`http://localhost:8080/cats`);
  let data = await res.json();
  return data;
};

const Home = () => {
  const [catsData, setCatsData] = useState([]);
  const [activeInNav, setActiveInNav] = useState({ index: -1, activeCat: {} }); //object me order matter nahi krta hai
  useEffect(() => {
    getData().then((res) => {
      setCatsData(res);
      setActiveInNav({ ...activeInNav, activeCat: res[0], index: 0 });
    });
  }, []);

  const handleOnClick = (item, index) => {
    return () => {
      setActiveInNav({ ...activeInNav, activeCat: item, index });
    };
  };

  return (
    <Box width={"100%"}>
      <Box
        style={{
          borderTop: "1px solid grey",
          margin: ".8rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          height={"lg"}
          style={{ overflow: "scroll", overflowX: "hidden" }}
          w={"20%"}
          paddingTop={".8rem"}
          // borderBottom={"Scrollbar"}
        >
          <VStack spacing={1} align="stretch">
            <Divider />

            {catsData &&
              catsData.map((item, index) => (
                <Box
                  onClick={handleOnClick(item, index)}
                  key={item._id}
                  display={"flex"}
                  bg={index === activeInNav.index ? "blue.500" : "#ffffff"}
                  style={{ cursor: "pointer" }}
                  border={"1px solid "}
                >
                  <Box
                    h="10"
                    w={"90%"}
                    margin={"auto"}
                    color={
                      index === activeInNav.index ? "#ffffff" : "blackAlpha.600"
                    }
                  >
                    {item.name}
                  </Box>
                  <Tag
                    h={"10"}
                    w={"10%"}
                    bg={index === activeInNav.index ? "blue.500" : "#ffffff"}
                    color={
                      index === activeInNav.index ? "#ffffff" : "blackAlpha.600"
                    }
                  >
                    {item.catCount}
                  </Tag>
                </Box>
              ))}
          </VStack>
        </Box>
        <Box w={"30%"} paddingTop={".5rem"}>
          <CardDetail
            activeInNav={activeInNav}
            getData={getData}
            setActiveInNav={setActiveInNav}
            setCatsData={setCatsData}
            data={activeInNav?.activeCat}
          />
        </Box>
        <Box w={"20%"} paddingTop={".5rem"}>
          <Form
            activeInNav={activeInNav}
            getData={getData}
            setActiveInNav={setActiveInNav}
            setCatsData={setCatsData}
          />
        </Box>
      </Box>
      <Box borderTop={"1px solid grey"} margin={".8rem"}>
        <Cards catsData={catsData} />
      </Box>
      <Divider />
    </Box>
  );
};

export default Home;
