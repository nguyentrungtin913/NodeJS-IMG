import mongoose from "mongoose";
let mongoosePaginate = require("mongoose-paginate");

let Schema = mongoose.Schema;
let UserSchema = new Schema({
  user_email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  user_password: {
    type: String,
  },
  user_first_name: {
    type: String,
  },
  user_last_name: {
    type: String,
  },
  user_status: {
    type: Number,
    default: 0,
  },
  user_create_at: {
    type: Date,
    default: new Date().toISOString(),
  },
  user_update_at: {
    type: Date,
    default: null,
  },
  user_create_by: {
    type: String,
  },
  user_update_by: {
    type: String,
  },
  user_deleted: {
    type: Number,
    default: 0,
  },
  user_deleted_at: {
    type: Date,
  },
  user_role: {
    type: Schema.Types.ObjectId,
    ref: "User_Role",
  },
});

UserSchema.plugin(mongoosePaginate);

// Create model from the schema
let User = mongoose.model("User", UserSchema);
// Export model
export default User;
