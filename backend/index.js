const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

mongoose.connect(  //to connect to our mongodb server
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

    app.use("api/users", userRoute);
   // app.use("/api/pins", pinRoute);

app.listen(8800,()=>{     
    console.log("Backend server kam kar rha hai");
})