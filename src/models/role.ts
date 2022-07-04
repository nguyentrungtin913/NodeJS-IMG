import mongoose from 'mongoose';
let Schema = mongoose.Schema;
  
let roleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
  },
  role_create_date: {
    type: Date, 
    default: Date.now
  },
  role_update_date: {
    type: Date, 
    default: Date.now
  },
  role_create_by: {
    type: String
  },
  role_update_by: {
    type: String
  },
  user_role: {
    type: Schema.Types.ObjectId,
    ref: "UserRole"
  }
});

export default mongoose.model('Role', roleSchema);