const mongoose = require('mongoose');



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

    mongoose.connect(process.env.DB_LOCAL_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}


module.exports = connectDatabase;