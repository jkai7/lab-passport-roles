const express    = require("express");
const router     = express.Router();
const Ironhacker = require('../models/user');
const bcrypt     = require("bcrypt");
const bcryptSalt = 10;
const flash      = require("connect-flash");
const passport   = require("passport");


//== signup page
router.get('/signup', (req, res, next) => { //create url name
    res.render('auth/signup');// response render folder with hbs 
});

    /* beginning of signup post */
    //== post the new user 
    router.post("/signup", (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
    
        //==if username or password are empty strings, reponse w/ and render a message
        if(username === "" || password === ""){
            res.render("auth/signup", {message: "Invalid Username or Password!"});
            return;
        }
    
        //==find username, if it exists, render error message
        Ironhacker.findOne({username: username}, "username", (err, user) => {
            if(user !== null){
                res.render("auth/signup", {message: "Sorry, that username already exists"});
                return;
            }

            //==convert password to hash then salt it 
            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);

            //== make new user with hashed psswrd as new psswrd
            const newIronhacker = new Ironhacker ({
                username: username,
                password: hashPass //==converted password
            })

            //==after hashing psswrd, save new user and redirect them to certain page
            newIronhacker.save((err) => {
                if(err){
                    res.render("auth/signup", {message: "Something went wrong"});
                }else{
                    res.redirect("/signup-success")//redirects to this page
                }
            });
        });
    });
    /* END of signup post */

//== page user gets redirected to after successfull signup
router.get("/signup-success", (req, res, next) => {
    res.render("auth/signupSuccess")
})


//== export routes
module.exports = router; 