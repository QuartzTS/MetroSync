// Simply export environment variables..
require("dotenv").config();


const SERVER_PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV
const MONGO_URI = process.env.MONGO_URI;

module.exports = { SERVER_PORT, NODE_ENV, MONGO_URI };
