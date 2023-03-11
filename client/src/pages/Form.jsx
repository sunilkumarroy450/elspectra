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
    setFormValue({ ...formValue, name, image, catCount }); //name,image,catCount is Coming from destructring of props
  }, [activeInNav]); // Jab Parents state ka props ko child components ko milta hai aur hm use initial state me set krte hai.
  // Lekin agar hm us state ko parent me kr dete hai aur m chahate hai ki jo parent me jo state upadte hua hai,
  // wo updated state hamre child component ke initial state me v update jo jaye to ,
  //yesa krne k liye useEffect me state ko update/set krna padega, aur parents se aaye props  ko as a dependency
  // dena hoga kyuki props mera change ho jata hai

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    const formState = { ...formValue, [name]: value };
    setFormValue(formState);
  };

  const updatingCatForm = async () => {
    try {
      fetch(`https://joyous-blue-sunglasses.cyclic.app/cats/update/${_id}`, {
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
        fetch(`https://joyous-blue-sunglasses.cyclic.app/cats/post`, {
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
