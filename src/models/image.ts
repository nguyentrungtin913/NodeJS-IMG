import mongoose from "mongoose";

var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  image_original_name: {
    type: String,
    required: true,
  },
  image_system_name: {
    type: String,
    required: true,
  },
  image_message: {
    type: String,
  },
  canva_design_id: {
    type: String,
  },
  canva_user_id: {
    type: String,
  },
  canva_brand: {
    type: String,
  },
  canva_label: {
    type: String,
  },
  image_status: {
    type: Number,
    required: true,
    default: 0,
  },
  image_create_at: {
    type: Date,
    default: new Date().toISOString(),
  },
  image_update_at: {
    type: Date,
  },
  image_create_by: {
    type: String,
  },
  image_update_by: {
    type: String,
  },
  image_deleted: {
    type: Number,
    default: 0,
  },
  image_deleted_at: {
    type: Date,
  },
});

var Image = mongoose.model("Image", ImageSchema);

export default Image;
