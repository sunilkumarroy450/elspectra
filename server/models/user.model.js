const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ageCategory: {
      type: String,
      default:"Young"
    },
    image: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      default:"Ko JO Mo"
    },
    catCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserModel = new model("user", UserSchema);
module.exports = UserModel;
