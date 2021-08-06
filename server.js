require("dotenv").config();
const server = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.DB_CLUSTER_CONNECTION.replace(
      "<password>",
      process.env.DB_PASSWORD
    ),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Server is integrated with MongoDB!"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});
