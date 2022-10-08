const app = require('./app');

const connectDatabase = require('./config/database')

const dotenv = require('dotenv');



// Handle Uncaught exception
process.on('uncaughtException', err=>{
    console.log(`ERROR: ${err.message}`);
    console.log(`ERROR: ${err.stack}`);

    console.log("Shutting down due to uncaughtException   exception ");
     
        process.exit(1);
    
})
 



// setting up config file
dotenv.config({path: 'backend/config/config.env' })

 




// connecting to database
connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT :${process.env.PORT} in ${process.env.NODE_ENV} mode .`  )
})



// Handle unHandled  Promise rejection
process.on('unhandledRejection', err =>{
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise rejection");
    server.close(()=>{ //this call const server 
        process.exit(1);
    })
})