import mongoose from 'mongoose';

import { globals } from '../globals';


let mongoUser = '';
if (globals.config.db.user && globals.config.db.pass) {
  mongoUser = `${globals.config.db.user}:${globals.config.db.pass}@`;
}

mongoose.connect(`mongodb://${mongoUser}${globals.config.db.host}:${globals.config.db.port}/${globals.config.db.name}`);

mongoose.Promise = Promise;

export default mongoose.connection;
