
const multer = require("./middleware/assets")
const auth = require("./middleware/auth")
const fs = require("fs");
const db = require("./database/models/assets")
const cloudinary = require("./middleware/cloudinary");
module.exports = function (router) {

    router.post('/assets', auth, multer.fields([
        { name: "profile", maxCount: 1 },
        { name: "resume", maxCount: 1 }

    ]), async (req, res) => {
        try {
            const userid = req.decoded.userid

            if (!req.files.profile) {
                var upload1 = {}
            } else {
                upload1 = await cloudinary.v2.uploader.upload(req.files.profile[0].path)
            }
            if (!req.files.resume) {
                var upload2 = {}
            } else {
                upload2 = await cloudinary.v2.uploader.upload(req.files.resume[0].path);
            }
            const data = {
                _id: userid,
                profileUrl: upload1.secure_url,
                resumeUrl: upload2.secure_url
            }
            const datas = await db(data)
            const result = await datas.save()
            res.status(200).json({ success: true, message: 'Successfully uploaded send', result:result});
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });

        }
    })
    router.get("/assets/:_id", async (req, res) => {
        try {
            const userid = req.params._id;
            const userdatas = await db.findById(userid)
            res.status(200).json({ success: true, data: userdatas });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
            console.log(error);
        }
    })




    return router
}