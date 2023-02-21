const multer = require("multer");
const fs = require("fs");
const path = require("path");
// require("../assets/imgs")

const uploadfile = multer({  
  storage: multer.diskStorage({  
    
    filename: (req, file, cb) => {
        if(file.fieldname=="resume"){
            if (!file.originalname.match(/\.(pdf)$/)) {
             
                return cb(new Error('Please upload a valid Document in pdf format'),)
            }else{
                
                return cb(null, Date.now() + "--" + file.originalname)
            }
        }else if(file.fieldname=="profile"){
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                const ext = path.extname(file.originalname);
                console.log(file.fieldname);
            const limits = {fileSize: 5 * 1024 * 1024,};
                        return cb(new Error('Please upload a valid image file' ))
                    }else{
                        return cb(null, Date.now() + "--" + file.originalname)

                    }
     }else{
        return cb(new Error('Please upload a valid image file' ))
     }
  
        // console.log("file uploaded!");
      
    },
  }),
});

module.exports=uploadfile;