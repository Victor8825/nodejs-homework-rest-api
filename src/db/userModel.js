const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
  this.avatarURL = await gravatar.url(this.email, {
    s: "200",
    r: "g",
    d: "monsterid",
    protocol: "https",
  });
});

const User = model("user", userSchema);

module.exports = User;
