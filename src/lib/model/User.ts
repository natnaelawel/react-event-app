import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  password: String,
});

userSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

const User = models.User || model("User", userSchema);

export default User;
