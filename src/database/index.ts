import mongoose from "mongoose";

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
);
mongoose.Promise = global.Promise;

export default mongoose;