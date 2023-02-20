require("./database/config")
require("dotenv").config();
var fs = require("fs");
const express = require("express");
const port=process.env.PORT
const app = express();
const router = express.Router()
const Login=require("./Login")(router)
const cors = require("cors")
app.use(
    cors({
      origin: ["http://wbpanel.epizy.com/"],
      credentials: true,
    })
  );const cookies = require("cookie-parser")
app.use(cookies())
app.use((express.json({limit:"50mb"})))
const morgan = require("morgan");
app.use((res,req,next)=>{
    res.header("Access-Control-Allow-Origin","http://wbpanel.epizy.com/")
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,HEAD,DELETE")
    res.header("Access-Control-Allow-Headers","authentication,Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id")
    next()
})

app.use(morgan("dev")); 

app.use("/",Login)

app.listen(port, () => {
    console.log(`Port = ${port} URL:-http://localhost:${port}`);
  });
  