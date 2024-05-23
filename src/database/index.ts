import mongoose from "mongoose";

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, MONGO_URI } = process.env

mongoose.connect(
  MONGO_URI || `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
);
mongoose.Promise = global.Promise;

export default mongoose;