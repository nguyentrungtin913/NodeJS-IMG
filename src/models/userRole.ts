import mongoose from 'mongoose';

// Get the Schema constructor
let Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
let UserRoleSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    role_id: {
        type: String,
        required: true,
    },
    user_role_create_date: {
        type: Date,
        default: Date.now
    },
    user_role_update_date: {
        type: Date,
        default: Date.now
    },
    user_role_create_by: {
        type: String
    },
    user_role_update_by: {
        type: String
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    }
});

// Create model from the schema
let UserRole = mongoose.model("User_Role", UserRoleSchema);

// Export model
export default UserRole;