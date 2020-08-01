// Import
import { Document } from 'mongoose';

// Interface
export interface IUser extends Document {
  name: string;
  password: string;
}
