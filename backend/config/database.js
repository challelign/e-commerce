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

  mongoose
    //  for local mongodb use this DB_LOCAL_URL
    .connect(process.env.DB_URI, {
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
