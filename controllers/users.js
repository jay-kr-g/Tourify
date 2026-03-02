const User = require("../models/user.js");

//sign-up render
module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup.ejs");
};

//sign-up
module.exports.signup = async(req,res,next)=>{
    try{
        let {username, email, password} = req.body; 
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        // Log the user in automatically after registration
        req.login(registeredUser,(err)=>{
            if(err){
            return next(err);
            }
            req.flash("success","Welcome to WanderLust");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

//Login render
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login");
};

//Login
module.exports.login = async(req,res)=>{
    req.flash("success","Welcome to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "listings";
    res.redirect(redirectUrl);
};

//Logout
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","LogOut Successfully!");
        res.redirect("/listings");
    });
};