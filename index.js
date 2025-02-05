const express = require ("express")
const cors = require("cors")
const UserRoutes = require("./routes/UserRoutes")
const path = require('path');
const DbConnect = require("./config/ConnectDb");
const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/v1",UserRoutes)

app.listen(3000,()=>{
    console.log("Server Started")
    DbConnect()
})