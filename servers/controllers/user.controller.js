const express = require("express");
const UserModel = require("../models/user.model");
const router = express.Router();
//get
router.get("/", async (req, res) => {
  try {
    const allCatsData = await UserModel.find();
    return res.status(200).send(allCatsData);
  } catch (error) {
    return res.send({ msg: "Something went wrong" });
  }
});
//post
router.post("/post", async (req, res) => {
  const { name, ageCategory, image, nickName, catCount } = req.body;
  try {
    const cats = new UserModel({
      name,
      ageCategory,
      image,
      nickName,
      catCount,
    });
    console.log(cats, "Cats Data");
    await cats.save();
    return res.status(201).send("Cats New Data Created Succesfully");
  } catch (error) {
    return res.send({ msg: error.message }, error);
  }
});

//get/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cats = await UserModel.findOne({ _id: id });
    console.log(cats);
    return res.status(200).send(cats);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//update
router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, image, catCount } = req.body;
  try {
    const updatedCats = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        image,
        catCount,
      },
      { new: true }
    );
    console.log(updatedCats, "Upadted Cats Data");
    return res.status(200).send(updatedCats);
  } catch (error) {
    res.status(304).send({ msg: error.message });
  }
});

router.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = router;
