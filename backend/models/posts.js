import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
      //required: true,
    },
    city: {
      type: String,
      //required: true,
    },
    phone: {
      type: String,
      //required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UserSchema);
export default Users;