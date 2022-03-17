const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { genSalt } = require("bcryptjs");

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

/* POST signup page */
router.post("/signup", async (req, res, next) => {
    
    try{
    const {email, password, fullName} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('password', salt);
    
    const user = {
        email: email,
        password: hash,
        fullName: fullName,
    };
    await UserModel.create(user);
    res.redirect('/login');

}
catch(err){
    console.log(err);
    res.render("signup", {error: "you already have an account"})
}
});

/* GET login page */
 router.get("/login", (req, res, next) => {
    res.render("login");
  });


/* POST login page */
router.post("/login",  async (req, res, next) => {
try{
    const user = await UserModel.findOne({ email: req.body.email });
    const hashFromDb = user.password;
    const passwordCorrect = await bcrypt.compare(req.body.password, hashFromDb);
        console.log(passwordCorrect ? "Yes" : "No");
        if (!passwordCorrect) {
            throw Error("Password incorrect");
        }
        req.session.currentUser = user;
        res.redirect("/yourrooms");
}
    catch(err){
    res.render("login", { error: "Wrong username or password" });
    }
});



module.exports = router;
