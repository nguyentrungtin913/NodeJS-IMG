import mongoose from "mongoose";

var Schema = mongoose.Schema;

var ImageTagSchema = new Schema({
  image_id: {
    type: String,
    required: true,
  },
  image_tag: {
    type: String,
    required: true,
  },
  image_create_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

var ImageTag = mongoose.model("ImageTag", ImageTagSchema);

export default ImageTag;
