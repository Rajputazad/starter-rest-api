const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY;
const db = require("./database/models/login")
const multer = require("multer")()
const auth = require("./middleware/auth")
module.exports = function (router) {

    router.post('/register', multer.any(), async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const existingUser = await db.findOne({ email });


            if (existingUser) {
                return res.status(409).json({ success: false, message: 'Email already exists' });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);

                const creatusere = await db.create({
                    email: email,
                    password: hashedPassword,
                    name: req.body.name,
                    Role_id: 1,
                    verify: false
                });
                const token = jwt.sign({ userid: creatusere._id }, SECRET_KEY, {
                    expiresIn: "24h"
                })
                creatusere.token[0] = token
                await creatusere.save();
                res.status(200).json({ token: token, success: true, message: 'User registered successfully' });

            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });
    router.post('/login', multer.any(), async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password

            const user = await db.findOne({ email });
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userid: user._id }, SECRET_KEY, {
                expiresIn: "24h"
            });
            user.token[0] = token
            await user.save();
            res.status(200).json({ token: token, success: true, message: 'User Login successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });

        }
    });

    router.get('/home', auth, async (req, res) => {
        try {
            const userid = req.decoded.userid;
            const userdatas = await db.findById(userid).select("-password");
            res.status(200).json({ success: true, data: userdatas });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    })


    return router
}