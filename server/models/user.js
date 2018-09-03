import bcrypt from "bcrypt";
import mongoose from "../config";
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// On Save Hook, encrypt password
userSchema.pre('save', async function() {
  const saltRounds = 10;
  await bcrypt.hash(this.password, saltRounds).then((hash) => {
    this.password = hash;
  })
});

// Create the modal class
const ModelClass = mongoose.model('user', userSchema);

// Export the modal
export default ModelClass;
