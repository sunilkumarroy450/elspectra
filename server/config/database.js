const mongoose = require("mongoose");
const MONGODB_URL = `mongodb://spectra:spectra@ac-imai0kc-shard-00-00.mcq1b9l.mongodb.net:27017,ac-imai0kc-shard-00-01.mcq1b9l.mongodb.net:27017,ac-imai0kc-shard-00-02.mcq1b9l.mongodb.net:27017/?ssl=true&replicaSet=atlas-nnd82m-shard-0&authSource=admin&retryWrites=true&w=majority`;
const connection = async () => {
  return await mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true })
    .then(() => console.log(`Connected to DataBase`))
    .catch((error) => error.message);
};
module.exports = connection;
