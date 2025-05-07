const mongoose = require("mongoose");

const connectDatabase = () => {
  // mongoose.connect(process.env.DB_LOCAL_URL, (err) => {
  //     if (!err) {
  //         // console.log('Mongo connect ' ,con.connection.host);
  //         console.log("Data base connected  ")
  //     }
  //     else {
  //         console.log('db error')
  //     }
  // })

  const local_db = process.env.DB_LOCAL_URL;
  const server_db = process.env.DB_URI;

  process.env.NODE_ENV === "PRODUCTION"
    ? console.log("server_db", server_db)
    : console.log("local_db", local_db);
  mongoose
    .connect(process.env.NODE_ENV === "PRODUCTION" ? server_db : local_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    });
};

module.exports = connectDatabase;
