import mongoose, { Schema } from 'mongoose';

const AdminSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
}, {
  toObject: {
    transform(doc, ret) {
      delete ret.password; // eslint-disable-line
    },
  },
  toJSON: {
    transform(doc, ret) {
      delete ret.password; // eslint-disable-line
    },
  },
});

export default mongoose.model('Admin', AdminSchema);

export const fillables = ['firstname', 'lastname', 'email', 'password'];
