const db = require("./database/models/theme")
const multer = require("./middleware/theme")
const auth = require("./middleware/auth")
const fs = require("fs");
const cloudinary = require("./middleware/cloudinary");

module.exports = function (router) {


    router.post('/themeadd', auth, multer.single("theme"), async (req, res) => {
        try {
            const role_id = req.decoded.role_id
            console.log(role_id);
            if (role_id == 0) {
                const upload = await cloudinary.v2.uploader.upload(req.file.path)
                res.status(200).json({ success: true, message: 'theme successfully added' });
                const data = {
                    themename: req.body.themename,
                    themeimage: upload.secure_url,
                    themeurl: req.body.themeurl
                }

                const theme = await db(data);
                const result = await theme.save()

            } else {
                return res.status(401).json({ success: false, message: 'Contact to Super admin' })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });

        }
    })

    router.get('/themelist', auth,async (req, res) => {
      try {
          const userdatas = await db.find()
          res.status(200).json({ success: true, data: userdatas });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    })


    return router
}