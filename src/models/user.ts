// Imports
import { model, Schema } from 'mongoose';
import { IUser } from '../types/user';

// Schema
const userSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Model export
export default model<IUser>('User', userSchema);
