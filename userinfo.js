const db = require("./database/models/userinfo")
const login = require("./database/models/login")
const multer = require("multer")()
const auth = require("./middleware/auth")
module.exports = function (router) {

    router.post('/userinfo', auth,multer.any(), async (req, res) => {
        try {
            const userid = req.decoded.userid;
            const userdatas = await login.findById(userid)
            const data = await db(req.body)
            await data.save()
            userdatas.information="done"
            await userdatas.save()
            res.status(200).json({ success: true, message: 'User Infomation successfully send' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });

        }
    })
    router.put('/userinfo',auth,multer.any(), async (req, res) => {
        try {
            const userid = req.decoded.userid;
            const result = await db.findByIdAndUpdate(userid,req.body)
            res.status(200).json({ success: true, message: 'User Infomation successfully Update' ,result:result});
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });

        }
    })


    router.get("/userinfo/:_id", multer.any(), async (req, res) => {
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