import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
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

export default mongoose.model('User', UserSchema);

export const fillables = ['firstname', 'lastname', 'email', 'phone', 'password'];
