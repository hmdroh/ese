var FacebookStrategy = require("passport-facebook").Strategy;
var User = require("../models/user");
var session = require('express-session')
console.log("----thiss is passport fb file----");
console.log(process.env.FACEBOOK_ID);

module.exports = function (app, passport) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false }}))
    
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id); //testing
        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
    });


    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "/auth/facebook/callback",
        passReqToCallback : true,
        // callbackURL: "https://elders-share-exp.herokuapp.com",
        profileFields: ['id', 'displayName', 'photos', 'email']

    },
        function (accessToken, refreshToken, profile, done) {
            console.log("----this is before fb----");
            console.log(profile);
            console.log("----this is after fb----");
            // User.findOrCreate(..., function(err, user) {
            //   if (err) { return done(err); }
            //   done(null, user);
            // });
                // txt = JSON.stringify(profile);

            // User.create({
            //     email: profile._json.email,
            //     password: "password",
            //     displayname: "test",
            //     firstname: "test",
            //     lastname: "test",
            //     gender: "M",
            //     dob: "13/13/2018",
            //     accounttype: "E",
            //     zipcode: "99999",
            //     lat: "1.2",
            //     lng: "0.2"
          
            //   }).then(function() {
            //     res.redirect(307, "/api/login");
            //   }).catch(function(err) {
            //     console.log(err);
            //     res.json(err);
            //     // res.status(422).json(err.errors[0].message);
            //   });


            done(null, profile);
        }
    ));

    // app.get("/api/auth/facebook/",
    // passport.authenticate("facebook", {scope:['email']}));
    
    // app.get("/api/auth/facebook/callback/",
    // passport.authenticate("facebook", {failureRedirect:""}),
    // function(req,res){
    //   return res.redirect("https://localhost:3000/profile/?id=" + this.id);
    // });

    app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/login' }), 
    function(req,res){
        
        console.log("Auth");
        return res.redirect("/profile/?id=" + this.id);
        // res.end("facebook done");
    });

    app.get('/auth/facebook', 
    passport.authenticate('facebook', { scope: 'email' }));

    return passport;

}