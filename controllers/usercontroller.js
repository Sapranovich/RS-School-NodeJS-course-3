const { Router } = require("express");
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const  CONST = require('../Constants');
require('dotenv').config();

const timeExpiresIn =  CONST.MINUTES_PER_HOUR * CONST.SECONDS_PER_MINUTE * CONST.HOURS_PER_DAY;

router.post('/signup', (req, res) => {
    User.create({
        full_name: req.body.full_name,
        username: req.body.username,
        passwordHash: bcrypt.hashSync(req.body.password, CONST.SALT),
        email: req.body.email,
    })
        .then(
            function signupSuccess(user) {
                let token = jwt.sign({ id: user.id }, process.env.SECRET_CODE, { expiresIn: timeExpiresIn });
                res.status(200).json({
                    user: user,
                    token: token
                })
            },

            function signupFail(err) {
                res.status(500).send(err.message)
            }
        )
})

router.post('/signin', (req, res) => {
    User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.passwordHash, function (err, matches) {
                if (matches) {
                    var token = jwt.sign({ id: user.id }, process.env.SECRET_CODE, { expiresIn: timeExpiresIn });
                    res.json({
                        user: user,
                        message: "Successfully authenticated.",
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({ error: "Passwords do not match." })
                }
            });
        } else {
            res.status(403).send({ error: "User not found." })
        }

    })
})

module.exports = router;