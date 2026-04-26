require("dotenv").config();
const express = require('express');
const mongoose = require ('mongoose');
const cors = require ('cors');

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Connected to MongoDB"))
.catch((err) => console.log (err));

app.get('/',(req,res)=>{
   console.log("backend is running ");
});

app.listen(5000,() =>{
    console.log("sever is wroking")
} );

