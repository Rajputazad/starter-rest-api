const multer = require("multer");
const fs = require("fs");
const path = require("path");
// require("../assets/imgs")

const uploadfile = multer({
    storage: multer.diskStorage({

        filename: (req, file, cb) => {

            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {

                return cb(new Error('Please upload a valid Document in pdf format'),)
            } else {

                return cb(null, Date.now() + "--" + file.originalname)
            }
        }
    }),
});

module.exports = uploadfile;