import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

const Form = ({ activeInNav, setActiveInNav, setCatsData, getData }) => {
  const [formValue, setFormValue] = useState({
    name: "",
    image: "",
    catCount: "",
  });
  const [flag, setFlag] = useState(false);
  const { catCount, name, image, _id } = activeInNav.activeCat;
  useEffect(() => {
    setFormValue({ ...formValue, name, image, catCount }); 
  }, [activeInNav]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    const formState = { ...formValue, [name]: value };
    setFormValue(formState);
  };

  const updatingCatForm = async () => {
    try {
      fetch(`https://puzzled-toad-kilt.cyclic.app/cats/update/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formValue.name,
          image: formValue.image,
          catCount: formValue.catCount, //beacuse state is one step behiend
          // catCount:ref?.current
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickNewForm = async () => {
    setFormValue({ name: "", image: "", catCount: "" });
    setFlag(true);
  };

  const handleOnClickSubmit = (e) => {
    e.preventDefault();
    if (flag === false) {
      updatingCatForm().then(() => {
        setTimeout(() => {
          getData().then((res) => {
            setCatsData(res);
            setActiveInNav({
              ...activeInNav,
              activeCat: res[activeInNav?.index],
            });
          });
        }, 200);
      });
    } else {
      try {
        fetch(`https://puzzled-toad-kilt.cyclic.app/cats/post`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValue),
        });
        setTimeout(() => {
          getData().then((res) => {
            setCatsData(res);
          });
        }, 200);
        setFlag(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOnClickUndo = () => {
    setFormValue({ ...formValue, name, image, catCount });
  };

  return (
    <>
      <FormControl
        borderRadius={".2rem"}
        padding={".5rem"}
        border={"1px solid "}
        isRequired
      >
        <Stack spacing={5}>
          <Button
            onClick={handleOnClickNewForm}
            color={"#ffffff"}
            bg={"blue.500"}
            w={"60%"}
          >
            New Form
          </Button>
          <FormLabel>Cat Name</FormLabel>
          <Input
            size="lg"
            placeholder="Cat Name"
            value={formValue.name}
            onChange={handleOnChange}
            name="name"
          />
          <FormLabel>Cat Image</FormLabel>
          <Input
            size="lg"
            placeholder="Cat Image"
            value={formValue.image}
            onChange={handleOnChange}
            name="image"
          />
          <FormLabel>Cat Clicks</FormLabel>
          <Input
            size="lg"
            placeholder="Cat Clicks"
            value={formValue.catCount}
            onChange={handleOnChange}
            name="catCount"
          />
          <ButtonGroup>
            <Button onClick={handleOnClickSubmit} bg={"green.500"}>
              SAVE
            </Button>
            <Button onClick={handleOnClickUndo} bg={"red.500"}>
              UNDO
            </Button>
          </ButtonGroup>
        </Stack>
      </FormControl>
    </>
  );
};

export default Form;
