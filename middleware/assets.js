const multer = require("multer");
const fs = require("fs");
const path = require("path");
// require("../assets/imgs")

const uploadfile = multer({
  storage: multer.diskStorage({  
    filename: (req, file, cb) => {
    //   console.log(file);
      const ext = path.extname(file.originalname);
   
        cb(null, Date.now() + "--" + file.originalname);
        // console.log("file uploaded!");
      
    },
  }),
});

module.exports=uploadfile;