// Import
import { Document } from 'mongoose';

// Interface
export interface User extends Document {
  name: string;
  password: string;
}
