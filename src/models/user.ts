// Imports
import { model, Schema } from 'mongoose';
import { User } from '../types/user';

// Schema
const userSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Model export
export default model<User>('User', userSchema);
